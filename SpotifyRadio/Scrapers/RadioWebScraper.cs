using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using HtmlAgilityPack;
using SpotifyRadio.Objects;
using System.Text;
using System.IO;
using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace SpotifyRadio.Scrapers
{
    public class RadioWebScraper
    {
        public List<RadioSong> GetSongs(string downloadUrl)
        {
            //links currently need to be from TubeGenie
            return UpdateSpotifyInfo(GetWebSongs(downloadUrl));
        }

        private static List<RadioSong> GetWebSongs(string downloadUrl)
        {
            var html = string.Empty;

            try
            {
                using (WebClient client = new WebClient())
                {
                    html = client.DownloadString(downloadUrl);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("TubeGenie is down, or there was an error executing the web request: " + ex.Message);
                throw;
            }

            //load html and get tracks
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);

            var songElements = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("song"));

            var elements = htmlDoc.DocumentNode.Descendants("div");

            var results = new List<RadioSong>();

            var currentTrack = string.Empty;

            foreach (var song in songElements)
            {
                var track = song.InnerText.ToString().Trim()
                    .Replace("&#39;", @"'")
                    .Replace("&amp;", @"&")
                    .Replace("&#38", "&");

                if (track == currentTrack)
                    continue;
                else
                    currentTrack = track;

                //artist is 2 elements after track
                var artistElement = song.NextSibling.NextSibling;

                var artist = string.Empty;
                if (artistElement != null)
                    artist = artistElement.InnerText.ToString();

                if (!string.IsNullOrEmpty(artist) && !string.IsNullOrEmpty(track))
                    results.Add(new RadioSong() { Artist = artist, Track = track, Art = string.Empty, SpotifyId = string.Empty });
            }

            return results;
        }

        private static List<RadioSong> UpdateSpotifyInfo(List<RadioSong> songs)
        {
            var spotifyApiUrl = "https://api.spotify.com/v1/search/";

            foreach (RadioSong song in songs)
            {
                var urlParameters = string.Format("?q={0}+{1}&type=track&limit=1",
                    song.Artist.Replace(" ", "+"),
                    song.Track.Replace(" ", "+"));

                var responseText = string.Empty;

                var request = WebRequest.Create(spotifyApiUrl + urlParameters) as HttpWebRequest;

                try
                {
                    var response = (HttpWebResponse)request.GetResponse();

                    var encoding = Encoding.ASCII;
                    using (var reader = new StreamReader(response.GetResponseStream(), encoding))
                    {
                        responseText = reader.ReadToEnd();
                        Debug.WriteLine(responseText);
                    }

                    JObject data = JObject.Parse(responseText);

                    try
                    {
                        var id = (string)data["tracks"]["items"][0]["id"];
                        song.SpotifyId = id;

                        var art = (string)data["tracks"]["items"][0]["album"]["images"][0]["url"];
                        song.Art = art;

                        song.Track = WebUtility.HtmlDecode(song.Track);
                        song.Artist = WebUtility.HtmlDecode(song.Artist);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Couldn't get ID or album art for:\t{0} - {1}.\nError:{2}", song.Artist, song.Track, ex.Message);
                        song.SpotifyId = null;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(string.Format("Could not get Spotify track for:\t{0} - {1}.\nError:{2}", song.Artist, song.Track, ex.Message));
                    song.SpotifyId = null;
                }
            }

            return songs.Where(x => x.SpotifyId != null).ToList();
        }
    }
}