import { endAdventure, haveAdventures } from "../..";
import { askQuestion, clear, print } from "../ui/console";

const flavors = ["Apple", "Hell", "Heaven", "Bleach", "Rat Poison", "Nail"] as const;
type Flavor = typeof flavors[number];
const tools = ["Fork", "Hell Gate", "One Way Ticket To Heaven", "Toilet Brush", "Chainsaw"] as const;
type Tool = typeof tools[number];
const sounds = ["Tasty", "Hell Dog Barking", "Angel Song", "Coffin Dance"] as const;
const soundStatments = [
    "I just realized I shout out loudly! Why can it so tasty?",
    "I feel like in hell and I can hear the Hell Dog Barking!",
    "I can see a light tunnel and hear angel singing!",
    "I can see a few people outside my home and having Coffin Dance!",
];
// type Sound = typeof sounds[number];
// type SoundStatment = typeof soundStatments[number];
// type Result = {
//     sound: Sound;
//     SoundStatment: SoundStatment;
// };
const endings = [0, 1, 2, 3] as const;
type Ending = typeof endings[number];

let chosenFlavor: Flavor;

export function eatTarts(): void {
    clear(true);
    print("You are hungry and want to eat a tart!");
    flavors.forEach((f, i) => print(`   ${i} - ${f}`));
    askQuestion("Which flavor will you choose?", pickFlavors);
}

const pickFlavors = (input_flavor: string) => {
    const selectedFlavor: Flavor | undefined = parseFlavorInput(input_flavor);
    if (selectedFlavor === undefined) {
        print(`${input_flavor} is an invalid input, please choose again`);
        return eatTarts();
    }
    chosenFlavor = selectedFlavor;
    print("Now you close your eyes and randomly choose a tool to eat tart");
    askQuestion("Press ENTER to choose! ", getRandomTool);
};

const getRandomTool = () => {
    const chosenTool: Tool = tools[getRandomInt(tools.length)];
    outputEnding(chosenTool);
};

const outputEnding = (chosenTool: Tool) => {
    print("Eyes Opened!");
    print(`You chosen ${chosenFlavor} flavor!`);
    print(`You chosen ${chosenTool} as tool!`);

    let ending: Ending;
    if (chosenFlavor === "Apple" && chosenTool === "Fork") {
        ending = 0;
    } else if (chosenFlavor === "Hell" && chosenTool === "Hell Gate") {
        ending = 1;
    } else if (chosenFlavor === "Heaven" && chosenTool === "One Way Ticket To Heaven") {
        ending = 2;
    } else {
        ending = 3;
    }
    showEnding(ending);
};

const showEnding = (ending: Ending) => {
    print("Wait! I can hear something: ");
    print(`!!! ${sounds[ending]} !!!!`);
    print(`${soundStatments[ending]}`);

    switch (ending) {
        case 0:
            print("✅ CONGRATULATIONS! You successfully ate a WonderTart! 🥳");
            print("***************************************");
            return askQuestion("Press ENTER to re-enter Wonderland! ", haveAdventures);
        case 1:
            print("You DEAD! You put yourself into HELL!");
            print("***************************************");
            return askQuestion("Press ENTER to re-enter Wonderland! ", haveAdventures);
        case 2:
            print("You DEAD! You rise to heaven!");
            print("***************************************");
            return askQuestion("Press ENTER to re-enter Wonderland! ", haveAdventures);
        case 3:
            print("You CANNOT eat tart with that combination. 😭");
            print("***************************************");
            return askQuestion("Press ENTER to choose again! ", eatTarts);
        default:
            console.error("unexpected ending number");
            break;
    }
};

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function parseFlavorInput(input: string) {
    const selectedFlavor = parseInt(input);
    if (isNaN(selectedFlavor)) {
        return undefined;
    }
    if (selectedFlavor < 0 || selectedFlavor > flavors.length - 1) {
        return undefined;
    }
    return flavors[selectedFlavor];
}
