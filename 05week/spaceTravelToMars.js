'use strict';

// this Job-Type array provided for future development, but not used during
// the current testing.
let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// This class is a CrewMember, who has a Name, performs a Job aboard a Ship,
// has a Special Skill, and may be assigned to a Ship via the enterShip method.
class CrewMember {
  constructor (name, job, specialSkill, ship) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
  }
  // This method 1) adds the crewMember to the Crew of the assigned Ship, and
  // 2) adds the Name of the assigned Ship to the crewMember object.
  enterShip (assignedShip) {
    assignedShip.crew.push(this);
    this.ship = assignedShip;
  }
}

// This class creates a Ship object, which has a Name, a Type, an Ability,
// and a Crew array. The ability is a string which describes its mission.
// In order to perform its ability, the ship must have a crew of at least one.
class Ship {
  constructor (name, type, ability) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }
  // If the ship is currently manned by at least one crewMember, this method
  // will return its mission. Otherwise it will return a text string indicating
  // that the ship is currently unable to perform its mission.
  missionStatement () {
    if (this.crew.length === 0) {
      return `Can't perform a mission yet.`;
    }
    return this.ability;
  }
}


/***** MY TESTS USING HTML PAGE
var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
console.log("crewMember1.name, 'Rick Martinez' ||| crewMember1.job, 'pilot' ||| crewMember1.specialSkill, 'chemistry' ||| crewMember1.ship, null");
let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
crewMember1.enterShip(mav);
console.log("crewMember1.ship, mav ||| mav.crew.length, 1 ||| mav.crew[0], crewMember1");
console.log("mav.name, 'Mars Ascent Vehicle' ||| mav.type, 'MAV' ||| mav.ability, 'Ascend into low orbit' |||  mav.crew.length, 0");
let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
console.log("mav.missionStatement(), Can't perform a mission yet. ||| hermes.missionStatement(), Can't perform a mission yet.");
console.log("mav.missionStatement(), Ascend into low orbit");
crewMember2.enterShip(hermes);
console.log("hermes.missionStatement(), Interplanetary Space Travel");
*********/



//tests
let assert = require('assert');

if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');

      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');

      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');

      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');

      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
