const fetch = require("node-fetch");

async function getInfo() {
  const infoArray = [
    await fetch('http://jsonplaceholder.typicode.com/users'),
    await fetch('http://jsonplaceholder.typicode.com/posts'),
  ]
  const data = await Promise.all(infoArray)
  const usersArray = await data[0].json();
  const postsArray = await data[1].json();
  const newUsersArray = usersArray.map((el, i) => {
    return el = {
      id: el.id,
      name: el.name,
      email: el.email,
      address: `${el.address.city}, ${el.address.street}, ${el.address.suite}`,
      website: `https://${el.website}`,
      company: el.company.name,
      posts: postsArray.filter(el => el.userId === (i + 1)).map(el => el = {id: el.id, title: el.title, title_crop: `${el.title.slice(0, 20)}...`, body: `${el.body}`})
    }
  })
  console.log(newUsersArray[1].posts);

}

getInfo()
