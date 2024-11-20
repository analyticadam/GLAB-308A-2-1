//Character Robin Object
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
};

//iterating through RObin's inventory
for (items of adventurer.inventory) {
  //   console.log(items);
}

//Adding animal companion
adventurer.companion = {
  name: "Leo",
  type: "Cat",
};

// console.log(adventurer);
//Ticking on a flea to our poor cat
adventurer.companion.companion = {
  name: "Frank",
  type: "Flea",
  inventory: ["small hat", "sunglasses"],
};

// console.log(adventurer);

//creating roll function
function roll(mod = 0) {
  const result = Math.floor(Math.random() * 20) + 1 + mod;
  console.log(`${this.name} rolled a ${result}.`);
  return result;
}

//adding roll function to adventurer
adventurer.roll = roll;

// adventurer.roll();
// adventurer.roll(5);

//=============================Part 2 ================================================

//Creating character class
class Character {
  static Max_HEALTH = 100; //(Part 4)
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  //can also add the roll function here
}

//Recreating Robin (cause the old one had no hp and died) **Had to comment out for him to become apart of adventurer class
/* const robin = new Character("Robin");
  robin.inventory = ["sword", "potion", "artifact"];
  robin.companion = new Character("Leo");
  robin.companion.type = "Cat";
  robin.companion.companion = new Character("Frank");
  robin.companion.companion.type = "Flea";
  robin.companion.companion.inventory = ["small hat", "sunglasses"]; */

//Adding the roll Method to every character class
Object.assign(Character.prototype, { roll });

// robin.roll();
// robin.companion.roll(); //Leo the cat rolls
// robin.companion.companion.roll(); That darn dirty flea also rolls >.>

//Having adventurer inherient properties of character
class Adventurer extends Character {
  static ROLES = [
    "Fighter",
    "Healer",
    "Wizard",
    "Dancing Queen",
    "Katie-Parry",
    "Adam-Sandlurker",
    "Chris-chofer",
    "Ola-Deli",
    "In da Hood",
    "Hema-Globin",
    "Nickle-less",
    "Fatou-Facts",
  ];
  constructor(name, role) {
    super(name);
    //(Part 4) Checks if adventure role is valid
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(
        `Class ${role} isn't available please try again tomorrow or choose from one of these ${Adventurer.ROLES}`
      );
    }
    //Adventurers have specialized roles.
    this.role = role;
    //Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
    this.companion = null; //Add companions later  (Part 3)
  }
  //Assign a companion to the adventurer (Part 3) I don't know how to do this without dropping it in here
  setCompanion(companion) {
    this.companion = companion;
    // console.log(`${this.name} has a companion: ${this.companion.name}`);
  }
  // Adventurers have the ability to scout ahead of them.
  scout() {
    console.log(`${this.name} is scount ahead...`);
    super.roll();
  }
}

//Creating the companion class
class companion {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.inventory = [];
    this.companion = null; //for adding the flea back to the cat
  }
  //Companions can provide emotional support (unless its a flea)
  support() {
    if (this.type !== "Flea") {
      console.log(
        `${this.name} the ${this.type} is providing emotional support`
      );
    } else {
      console.log(
        `${this.name} the ${this.type} is a meance to society and is leeaching off this party`
      );
    }
  } //Companions can clear the perimeter
  search() {
    if (this.type !== "Flea") {
      console.log(
        `${this.name} the ${this.type} is searching the area for valuables`
      );
    } else {
      console.log(
        `${this.name} the ${this.type} is harrasing your party and needs to be stomped on`
      );
    }
  }
  //Assign a companion to companion
  setCompanion(companion) {
    this.companion = companion;
  }
}

//Finally, change the declaration
//of Robin and the companions to use the new Adventurer and Companion classes.

//Recreating robin again with properties of adventurer
//(name, role)
robin = new Adventurer("Robin", "In da Hood"); //Ngl, this explain alot about robin
robin.inventory.push(
  "sword",
  "potion",
  "artifact",
  "deus ex machina",
  "mcguffin"
); //returning his old items and more

//Creating the companions
//(name, race)
const leo = new companion("Leo", "Cat");
const frank = new companion("Frank", "Flea"); //This one really bugs me.
frank.inventory = ["small hat", "sunglasses"];
leo.inventory = ["catterang", "MeowZooka"]; //They never said I couldn't add items :P

//Reassigning companions
robin.setCompanion(leo);
leo.setCompanion(frank); // Boooo!

// console.log(robin);
// console.log(leo);
// leo.search();
// frank.search();

//=======================Part 4=================================
//Add a static MAX_HEALTH property to the Character class, equal to 100.
//Add a static ROLES array to the Adventurer class, with the values
//“Fighter,” “Healer,” and “Wizard.” Feel free to add other roles, if you desire!
//Add a check to the constructor of the Adventurer class that ensures the given role matches one of these values.

//=========================Part 5 =================================
// I learned about factories, but didn't see anything for me to do here.

//===============================Part 6 ===================================
/* Accept an Adventurer as a parameter.
  Use the roll() functionality to create opposing rolls for each adventurer.
  Subtract 1 from the adventurer with the lower roll.
  Log the results of this “round” of the duel, including the rolls and current health values.
  Repeat this process until one of the two adventurers reaches 50 health.
  Log the winner of the duel: the adventurer still above 50 health. */

//Creating a new adventurer for the fight
phil = new Adventurer("FillUP", "Dancing Queen");
phil.health = 75; // Sadly they have a curse on them.

// console.log(phil);
// console.log(robin);

//The function for the duel
function duel(adventure1, adventure2) {
  console.log(`${adventure1.name} VS ${adventure2.name}`);
  let round = 1;
  while (adventure1.health >= 50 && adventure2.health >= 50) {
    const dice1 = adventure1.roll(5); //They are cheating :)
    const dice2 = adventure2.roll();
    if (dice1 > dice2) {
      adventure2.health -= 1;
      console.log(`Round:${round} winner is ${adventure1.name} `);
    } else {
      adventure1.health -= 1;
      console.log(`Round:${round} winner is ${adventure2.name}`);
    }
    console.log(
      `Current standings are ${adventure1.name} health is:${adventure1.health}
        ${adventure2.name} health is:${adventure2.health} `
    );
    console.log("---------------------------------------------------");
    round++;
  }
  if (adventure1.health > 50) {
    console.log(
      `The winner of this duel is ${adventure1.name} who an amazing fight`
    );
  } else {
    console.log(
      `Sigh, I guess ${adventure2.name}is the winner... what a cheater!`
    );
  }
}

duel(robin, phil);
// console.log(robin);
// console.log(phil);

// console.log(robin.health);
