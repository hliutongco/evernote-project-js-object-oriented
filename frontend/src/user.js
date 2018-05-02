const userStore = []

class User {

  constructor(name){
    this.name = name
    userStore.push(this)
  }

}
