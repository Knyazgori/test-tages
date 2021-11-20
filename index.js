const fetch = require("node-fetch");

async function getInfo() {
  const infoArray = [
    await fetch('http://jsonplaceholder.typicode.com/users'),
    await fetch('http://jsonplaceholder.typicode.com/posts'),
    await fetch('http://jsonplaceholder.typicode.com/posts/2/comments')
  ]
  const data = await Promise.all(infoArray)
  const usersArray = await data[0].json();
  const postsArray = await data[1].json();
  const commentsArray = await data[2].json();
  const newUsersArray = usersArray.map((el, i) => {
    return el = {
      id: el.id,
      name: el.name,
      email: el.email,
      address: `${el.address.city}, ${el.address.street}, ${el.address.suite}`,
      website: `https://${el.website}`,
      company: el.company.name,
      posts: postsArray
        .filter((el) => el.userId === (i + 1))
        .map((el, i) => {
          return el = { id: el.id, title: el.title, title_crop: `${el.title.slice(0, 20)}...`, body: `${el.body}`};
        })

    }
  })
  const ervin = newUsersArray.filter(el => el.name === "Ervin Howell")
// console.log(ervin[0].posts);
  
console.log(commentsArray);
  // console.log(newUsersArray[1].posts);

}

getInfo();

// async function comments() {
//   const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${i}/comments`)
//   const data = await res.json()
//   const obj = await getInfo()
//   console.log(obj);
//   obj.map(el => el.posts)
//   // return obj
// }

// comments();
