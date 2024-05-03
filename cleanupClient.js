const fs = require("fs");
const path = require("path");

// function removeDirectory(dirPath) {
//   fs.rmSync(dirPath, { recursive: true, force: true });
//   console.log("done removing", dirPath);
// }
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file, index) => {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        try {
          // Recursive call for directories
          removeDirectory(filePath);
        } catch (error) {
          console.log("failed to delete directory: ", filePath);
        }
      } else {
        // Delete file
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.log("failed to delete file: ", filePath);
        }
      }
    });

    try {
      // Remove the empty directory itself
      fs.rmdirSync(dirPath);
    } catch (error) {
      console.log(`Directory ${dirPath} failed to remove.`);
    }
    // console.log(`Directory ${dirPath} removed successfully.`);
  } else {
    console.log(`Directory ${dirPath} does not exist.`);
  }
}

// Example usage
// const directoryToRemove = "/path/to/your/directory";const DIRPATH = path.normalize("./client");
const directoryToRemove = path.normalize("./client/node_modules");
removeDirectory(directoryToRemove);
