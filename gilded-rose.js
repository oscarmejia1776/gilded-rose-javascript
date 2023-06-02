export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

//Sub- Classes
export class Basic extends Item {
  updateQuality() {
    if (this.sellIn >= 0 && this.quality > 0) {
      this.sellIn--;
      this.quality--;
    } else if (this.sellIn < 0 && this.quality >= 2) {
      this.sellIn--;
      this.quality -= 2;
    } else {
      this.sellIn--;
      this.quality = 0;
    }
  }
}

export class Ripens extends Item {
  updateQuality() {
    this.sellIn--;
    this.quality++;
    if (this.quality > 50) {
      this.quality = 50;
    }
  }
}

export class Conjured extends Item {
  updateQuality() {
    if (this.sellIn >= 0 && this.quality >= 2) {
      this.sellIn--;
      this.quality -= 2;
    } else if (this.sellIn < 0 && this.quality >= 4) {
      this.sellIn--;
      this.quality -= 4;
    } else {
      this.sellIn--;
      this.quality = 0;
    }
  }
}

export class Legendary extends Item {
  updateQuality() {}
}

export class Ticket extends Item {
  updateQuality() {
    if (this.sellIn <= 0) {
      this.sellIn--;
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.sellIn--;
      this.quality += 3;
    } else if (this.sellIn <= 10) {
      this.sellIn--;
      this.quality += 2;
    } else {
      this.sellIn--;
      this.quality++;
    }
    if (this.quality > 50) {
      this.quality = 50;
    }
  }
}

export let items = [];

export function makeItem(name, sellIn, quality) {
  if (name === "Aged Brie") {
    return new Ripens(name, sellIn, quality);
  } else if (name === "Sulfuras, Hand of Ragnaros") {
    return new Legendary(name, sellIn, quality);
  } else if (name === "Backstage passes to a TAFKAL80ETC concert") {
    return new Ticket(name, sellIn, quality);
  } else if (name.startsWith("Conjured")) {
    return new Conjured(name, sellIn, quality);
  } else {
    return new Basic(name, sellIn, quality);
  }
}

items.push(makeItem("+5 Dexterity Vest", 10, 20));
items.push(makeItem("Aged Brie", 2, 0));
items.push(makeItem("Elixir of the Mongoose", 5, 7));
items.push(makeItem("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(makeItem("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(makeItem("Conjured Mana Cake", 3, 6));

//Refactoring - Restructure the code without changing its behavior
//Testing - Manual, automated testing
//Unit, integration, acceptance

export const updateQuality = () => {
  for (let item of items) {
    item.updateQuality();
  }
};
