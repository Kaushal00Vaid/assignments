class Animal {
  constructor(name, legCount, speaks) {
    this.name = name;
    this.legCount = legCount;
    this.speaks = speaks;
  }
  describe() {
    return `${this.name} has ${this.legCount} legs and does ${this.speaks}`;
  }
}

console.log(new Animal("Dog", 4, "bhow bhow").describe());
