import discord from "../server/discord";
import logger from "../server/logger";
import exampleCtrl from "../controllers/example";

const commands = {
    add: "exampleAdd",
    delete: "exampleDel",
    list: "exampleList",
    get: "example",
};

discord.onMessageEverywhere(message => {
    if (message.content.startsWith("!example")) {
        const extract = /!(.\S+)\s*([\s\S]*)/m.exec(message.content);
        const command = extract[1];
        const params = extract.length > 1 ? extract[2] : "";
        if (command === commands.get) {
            getExample(message.channel, params);
        }
        else if (command === commands.list) {
            listExamples(message.channel);
        }
    }
});

function getExample(channel, word) {
    exampleCtrl.getExample(word)
        .then(example => {
            if (example) {
                logger.info("Send:", example);
                discord.sendOn(channel, example.example);
            }
            else {
                discord.sendOn(channel, `Can't find ${example.example}`);
            }
        })
        .catch((err) => logger.error(err));
}

function listExamples(channel) {
    exampleCtrl.listExamples()
        .then(examples => {
            const values = examples.map((example) => {
                return example.example;
            });
            logger.info("List:", values);
            discord.sendOn(channel, values);
        })
        .catch((err) => {
            logger.error(err);
            discord.sendOn(channel, "Ho shit, something goes wrong");
        });
}

/**
 * Extract command and params, and peform corresponding action.
 */
discord.onCmdChannelMessage(message => {
    if (message.content.startsWith("!example")) {
        // match !command params
        const extract = /!(.\S+)\s*([\s\S]*)/m.exec(message.content);
        const command = extract[1];
        const params = extract.length > 1 ? extract[2] : "";

        if (command === commands.add) {
            addExample(params);
        }
        else if (command === commands.delete) {
            deleteExample(params);
        }
    }
});

function addExample(message) {
    exampleCtrl.saveExample(message)
        .then(example => {
            logger.info("Save:", example);
            discord.sendOnCmdChannel(`${example.example} saved!`);
        }).catch(err => logger.error(err));
}

function deleteExample(word) {
    exampleCtrl.deleteExample(word)
        .then(word => {
            logger.info("Delete:", word);
            discord.sendOnCmdChannel(`${word} deleted!`);
        })
        .catch((err) => logger.error(err));
}