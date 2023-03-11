const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

// Disable browser's autocomplete for the input field
input.setAttribute("autocomplete", "off");

// Set the current directory to root
let currentDirectory = "C:\\";

input.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) { // Enter key
		const command = input.value;
		input.value = "";
		const output = runCommand(command);
		terminal.innerHTML += `<p><span class="prompt">${currentDirectory}></span> ${command}</p><p>${output}</p>`;
		terminal.scrollTop = terminal.scrollHeight;
	}
});

function runCommand(command) {
	const args = command.split(" ");
	const cmd = args[0];

	// Change directory command
	if (cmd === "cd") {
		const dir = args[1];
		if (dir === undefined) {
			return "The syntax of the command is incorrect.";
		} else if (dir === "..") {
			// Move up one level in directory tree
			currentDirectory = currentDirectory.split("\\").slice(0, -1).join("\\");
		} else {
			// Move down one level in directory tree
			const newDir = currentDirectory + "\\" + dir;
			if (newDir === "C:\\Windows") {
				return "Access is denied.";
			} else {
				currentDirectory = newDir;
			}
		}
		return "";
	}

	// List directory contents command

	// Print working directory command
	if (cmd === "pwd") {
		return currentDirectory;
	}

	// Echo command
	if (cmd === "echo") {
		const message = args.slice(1).join(" ");
		return message;
	}

	// Clear screen command
	if (cmd === "cls") {
		terminal.innerHTML = "";
		return "";
	}
  
  // type file command
	if (cmd === "type") {
      return "File not found."
  }
  
   // reveal file command
	if (cmd === "cmV2ZWFs") {
      return "<a style='color: #F0F' href='canada'>canada</a>"
  }

	// Help command
	if (command == "help") {
    return "Available commands:<br>" +
           "cd - Change the current working directory<br>" +
           "type - Display the contents of a text file<br>" +
           "echo - Display a message on the screen<br>" +
           "cls - Clear the screen<br>" +
           "exit - Exit the terminal";
      }

	// Invalid command
	return `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
}