zip.workerScriptsPath = chrome.extension.getURL('js/');

// create a zip virtual filesystem
var fs1 = new zip.fs.FS();

// add some files into the zip filesystem

// add the "bbc-music.json" file in the root directory
fs1.root.addHttpContent("Control - Music.mp3",
  "http://cs4660.vk.me/u88459217/audios/425efee6ba44.mp3");
// add the "bbc-learning.json" file in the root directory
fs1.root.addHttpContent("Run - Run.mp3",
  "http://cs1664.vk.me/u1527630/audios/b8ab12df87a8.mp3");

// create a file named "test.zip" in the root directory of the HTML5 filesystem
createFile("c:\test.zip", function(fileEntry) {
  // export the zip content into "test.zip" file
  fs1.root.exportFileEntry(fileEntry, function(asd) {
      //console.log(asd.toUrl());
      console.log(URL.createObjectURL(asd));
      var a = document.createElement('a');
      a.href=URL.createObjectURL(asd);
      a.download = "asd.zip";
      a.click();
      alert("done");
    }, function(index, totalSize) {
      console.log(index + ' ' + totalSize);
    }
  )
});

// function to create a file in the HTML5 temporary filesystem
function createFile(filename, callback) {
  webkitRequestFileSystem(TEMPORARY, 4 * 1024 * 1024, function(fs1) {
    fs1.root.getFile(filename, { create : true }, callback);
  }, function(error) {console.log(error)});
}


