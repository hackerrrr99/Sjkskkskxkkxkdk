const config = {
    name: "anigen",
    aliases: ["genimg", "imagegen"],
    description: "Generate an image based on the given prompt.",
    usage: "[prompt]",
    cooldown: 5,
    permissions: [0, 1, 2],  // Permissions for all users
    isAbsolute: false,
    isHidden: false,
    credits: "Redwan",
};

/** @type {TOnCallCommand} */
async function onCall({ message, args }) {
    if (args.length === 0) {
        return message.send("Please provide a prompt to generate the image. Example usage: /generateImage gojo saturo");
    }

    const prompt = args.join(" ");  // Join the args to form the full prompt
    const apiUrl = `https://tensor-attempt-7.onrender.com/generate?prompt=${encodeURIComponent(prompt)}`;

    try {
        // Fetch the generated image URL from the API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to generate image. Please try again later.");
        }

        const imageUrl = await response.text();  // The API returns a direct image link as text

        // Send the image URL to the chat
        await message.send({
            body: `Here is the generated image for your prompt: "${prompt}"`,
            attachment: [imageUrl]  // Send the image as an attachment
        });
    } catch (error) {
        console.error(error);
        await message.send("There was an error generating the image. Please try again.");
    }
}

export { config, onCall };
