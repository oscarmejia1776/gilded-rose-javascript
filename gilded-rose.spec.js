import { expect, describe, it } from "vitest";
import { Item, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });
  // - Once the `sellIn` days is less then zero, `quality` degrades twice as fast.
  it("reduces quality by 2 for items with sellIn < 0", () => {
    const testItem = new Item("basic", -2, 8);
    items.push(testItem);

    //Act
    updateQuality();

    //Assert
    expect(testItem.quality).toBe(6);
    expect(testItem.sellIn).toBe(-3);
  });

  //The quality of an item is never negative.
  it("does not reduce quality to a negative number", () => {
    const testItem = new Item("basic", 6, 0);
    items.push(testItem);

    //Act
    updateQuality();

    //Assert
    expect(testItem.quality).toBeGreaterThanOrEqual(0);
  });

  //Aged Brie actually increases in quality the older it gets.
  it("increases the quality of the 'Aged Brie' items", () => {
    //Arrange
    const testItem = new Item("Aged Brie", 3, 8);
    items.push(testItem);

    //Act
    updateQuality();

    //Assert
    expect(testItem.quality).toBe(9);
  });

  //The 'quality of an item is never more than '50.
  it("it never increases the quality to more than 50", () => {
    //Arrange
    const testItem = new Item("Aged Brie", 3, 50);
    items.push(testItem);

    //Action
    updateQuality();

    //Assert
    expect(testItem.quality).toBe(50);
  });

  //"Sulfuras, Hand of Ragnaros," being a legendary item, never has to be sold nor does it decrease in `quality`.
  it("never has to be sold nor does it decrease in `quality`", () => {
    //Arrange
    const testItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);

    //Action
    updateQuality();

    //Assert
    expect(testItem.quality).toBe(80);
  });

  // - "Backstage passes to a TAFKAL80ETC concert", increase in `quality` as it's `sellIn` value decreases:
  // - `quality` increases by `2` when there are `10` days or less left before the concert.
  // - `quality` increases by `3` when there are `5` days or less left before the concert.
  // - `quality` drops to `0` after the concert.
  it("increases quality by 2 when there are <= 10 days before 'Backstage passes to a TAFKAL80ETC concert'", () => {
    //Arrange
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      20
    );
    items.push(testItem);

    //Action
    updateQuality();

    //Assert
    expect(testItem.sellIn).toBe(9);
    expect(testItem.quality).toBe(22);
  });

  it("increases quality by 3 when there are <= 5 days before 'Backstage passes to a TAFKAL80ETC concert'", () => {
    //Arrange
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    items.push(testItem);

    //Action
    updateQuality();

    //Assert
    expect(testItem.sellIn).toBe(4);
    expect(testItem.quality).toBe(23);
  });

  it(" sets quality to 0 when 'Backstage passes to a TAFKAL80ETC concert has ended", () => {
    //Arrange
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      -1,
      20
    );
    items.push(testItem);

    //Action
    updateQuality();

    //Assert
    expect(testItem.sellIn).toBe(-2);
    expect(testItem.quality).toBe(0);
  });

  // - "Conjured" items degrade in `quality` twice as fast as normal items.
  it.skip("reduces quality by two for 'Conjured' items.", () => {
    //Arrange
    const testItem = new Item("Conjured Mana Cake", 3, 6);
    items.push(testItem);

    //Action
    updateQuality();

    //Assert
    expect(testItem.sellIn).toBe(2);
    expect(testItem.quality).toBe(4);
  });
});
