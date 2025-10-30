import pp5 from "/assets/pp5.png"
import pp6 from "/assets/pp6.png"
import pp7 from "/assets/pp7.png"
import pp8 from "/assets/pp8.png"
import pp9 from "/assets/pp9.png"

const postsData=[
  {
    "id": 1,
    "userId": 1,
    "image": pp5,
    "caption": "Just got back from my trip to London — amazing experience!",
    "likes": 80,
    "comments":[
      {"user": "kiaramehta", "text": "Love this!" },
      {"user": "rahulv", "text": "Wonderful" },
      {"user": "saniam", "text": "Wow" }
    ]
  },
  {
    "id": 2,
    "userId": 2,
    "image": pp6,
    "caption": "Enjoying evening walks!",
    "likes": 140,
    "comments":[
      {"user": "kiaramehta", "text": "Love this!" }
    ]
  },
  {
    "id": 3,
    "userId": 3,
    "image": pp7,
    "caption": "Vacation mode on!",
    "likes": 120,
    "comments":[
      {"user": "kiaramehta", "text": "Love this!" },
      {"user": "rahulv", "text": "Wonderful" },
      {"user": "ketki", "text": "Loved the photos" },
      {"user": "sara", "text": "Great scenery" }
    ]
  },
  {
    "id": 4,
    "userId": 4,
    "image": pp8,
    "caption": "Love for saree!",
    "likes": 180,
    "comments":[
      {"user": "kiaramehta", "text": "Love this!" },
      {"user": "rahulv", "text": "Wonderful" }
    ]
  },
  {
    "id": 5,
    "userId": 5,
    "image": pp9,
    "caption": "Airport looks!",
    "likes": 60,
    "comments":[
      {"user": "kiaramehta", "text": "Love this!" },
      {"user": "rahulv", "text": "Wonderful" },
      {"user": "sara", "text": "Great" },
      {"user": "aditya", "text": "Pretty" },
      {"user": "ketki", "text": "ENjoyed watching" }
    ]
  }
];

export default postsData;
