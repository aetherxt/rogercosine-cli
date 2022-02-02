#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playername;

const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
const shortsleep = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

async function welcome() {
    const welcometext = chalkAnimation.neon(
        'Roger Cosine is that you???'
    );
    await sleep();
    welcometext.stop();
    
    const startmsg = `z i m o`
    figlet(startmsg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
    await sleep();
}

async function askname() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is your name?',
        default() {
            return 'Player';
        },
    });
    playername = answers.player_name;
}

async function consent() {
    const answers = await inquirer.prompt({
        name: 'consent',
        type: 'list',
        message: 'do you consent to the roger cosine test?\n',
        choices: [
            'yes',
            'yes'
        ]
    });
    return handleanswer(answers.consent == 'yes');
}

async function q1() {
    const answers = await inquirer.prompt({
        name: 'question1',
        type: 'list',
        message: 'Angus?\n',
        choices: [
            'yes',
            'no',
            'hobo',
            'bobo',
        ],
    });
    return handleanswer(answers.question1 == 'bobo');
}

async function q2() {
    const answers = await inquirer.prompt({
        name: 'question2',
        type: 'list',
        message: "David?\n",
        choices: [
            'david',
            'davib',
            'bavid',
            'dabib'
        ],
    });
    return handleanswer(answers.question2 == 'davib');
}

async function q3() {
    const answers = await inquirer.prompt({
        name: 'question3',
        type: 'list',
        message: "What is the hex code for zimo?\n",
        choices: [
            '#FFFFFF',
            '#000000',
            '#FF0000',
            '#00FF00'
        ],
    });
    return handleanswer(answers.question3 == '#FFFFFF');
}

async function handleanswer(isCorrect) {
    const spinner = createSpinner('sus...').start();
    await shortsleep();

    if (isCorrect) {
        spinner.success({ text: `lol ok ${playername}\n` });
        await sleep();
    } else {
        spinner.error({ text: `lmfao u got it wrong ${playername} \nget trolled` });
        process.exit(1);
    }
};

async function win() {
    console.clear();
    const winmsg = `GG, ${playername}, \nYou are now a roger cosine!`;

    figlet(winmsg, (err, data) => {
        console.log(gradient.atlas.multiline(data));
    });
}

await welcome();
await askname();
await consent();
await q1();
await q2();
await q3();
await win();