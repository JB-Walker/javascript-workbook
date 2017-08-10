'use strict';

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

class CrewMember {
  constructor (name, job, specialSkill, ship) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
  }
  enterShip (shipObj) {
    //shipObj.crew.push(this);
    this.ship = shipObj;
    this.ship.crew.push(this);
  }
}

class Ship {
  constructor(name, type, ability, crew) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }
  missionStatement () {
    if (this.crew.length) {
      return this.ability;
    } else {
      return 'Can\'t perform a mission yet.';
    }
  }
}



//  tests

let assert = require('assert');

if (typeof describe === 'function') {
  describe('CrewMember', function () {
    it('should have a name, a job, a specialSkill and ship upon instantiation', function () {
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function () {
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      console.log('mav? ' + crewMember1.ship);
      assert.equal(crewMember1.ship, mav);
      console.log('1? ' + mav.crew.length);
      assert.equal(mav.crew.length, 1);
      console.log('crewMember1? ' + mav.crew[0]);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function () {
    it('should have a name, a type, an ability and an empty crew upon instantiation', function () {
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function () {
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), 'Can\'t perform a mission yet.');
      assert.equal(hermes.missionStatement(), 'Can\'t perform a mission yet.');

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), 'Ascend into low orbit');

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), 'Interplanetary Space Travel');
    });
  });
}
