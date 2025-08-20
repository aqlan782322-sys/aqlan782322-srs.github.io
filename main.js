height: 600,

webPreferences: {

nodeIntegration: true

});

mainWindow.loadFile('index.html');

mainWindow.on('closed', function () {

mainWindow = null;

D

app.whenReady().then(createWindow);

app.on('window-all-closed", function () { if (process.platform !== 'darwin') app.quit();

app.on('activate', function () {

if (mainWindow =-= null) createWindow();



https://yourname.github.io/amin-almakhazin/