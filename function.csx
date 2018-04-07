#r "Newtonsoft.Json"
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Net.Http.Headers;
public static  HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log)
{
        string pageId = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
        .Value;

        string tmplId = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "tmplid", true) == 0)
        .Value;

        var content = GetBlob("pages",pageId+".json");
        var config = JsonConvert.DeserializeObject<Layout>(content);

        string layout = "";
        if(!string.IsNullOrWhiteSpace(config.layout)){
 
           layout= GetBlob("layouts",config.layout);
  log.Info(layout);

            foreach(var m in config.map){
            //log.Info(m.template);      
            log.Info("m.template");      
             layout = layout.Replace(m.template,m.component);
             //layout = layout.Replace(m.template,"");
            }
                    
        }
        foreach(var m in config.map){
             var manifest = GetBlob(m.component,$"1/build/asset-manifest.json");
             JObject o = JObject.Parse(manifest);
             layout = layout + $"<script src='https://microfrontends.azureedge.net/{m.component}/1/build/{o["main.js"]}'></script>";
        }

    var r = new HttpResponseMessage();
    r.Content = new StringContent($"<template id='{tmplId}'>" + layout+ "</template>");
    r.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
    return r;
}

public static string GetBlob(string container, string file){
    var connectionString ="<your connection>";
    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);

    // Create the destination blob client
    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
    CloudBlobContainer blobContainer = blobClient.GetContainerReference(container);
    
    CloudBlob blob = blobContainer.GetBlobReference(file);

   // string content;
    using (StreamReader reader = new StreamReader(blob.OpenRead()))
    {
        return reader.ReadToEnd();
    }
}

public class Layout{
    public string layout {get; set;}
    public IEnumerable<Mapping> map { get; set;}
}

public class Mapping{
    public string template {get; set;}
    public string component {get; set;}
}
