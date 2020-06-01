# Go-fit Server API 🤸

Go-fit is a RESTful server API for a daily log web-application, providing the main functions as log-in, daily logs with multi-media, weekly or monthly rankings and schduled email reminder.

## Table of Contents

- [Features](#Features)

- [Technologies](#Technologies)

- [Setup](#Setup)

- [Usage](#Usage)
- [Feedback](#Feedback)

## Technologies

<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" alt="Get in Touch with Express.js - Basho Code - Medium" style="zoom:10%" /> 4.17.1 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-ERa_H-wFBnjA0878uUjcm0biQRbXqlUl8EBDu6yWE9tmq3D2&amp;usqp=CAU" alt="MySQL 📘 ▻ sequelize 2탄 | 아구몬" style="zoom:13%;" />5.21.7

## Features

- Log-in/out, sign-up
- Daily log with a youtube video clip
- Tag filtering
- See a weekly, monthly, yearly ranking
- Send a remider email

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies. You might want to look into `config.json`to make change the port you want to use and set up a reminder email account.

## Usage

```bash
$ cd ../Go-fit server
$ npm i
$ ./node_modules/.bin/sequelize db:migrate
$ ./node_modules/.bin/sequelize db:seed:all
$ npm start
```

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:7777

If you want to use reminder mailing function, you should go to this [link](https://myaccount.google.com/lesssecureapps) and allow access to low-security apps while this API server is going on.

- [/api/user](#/api/user)

  : log-in, log-out, sign-up, rank

- [/api/daylog](#/api/daylog)

  : daylog, tag

- [/api/video](#/api/video)

  : youtube video info

- [/api/calender](#/api/calender)

  : workoutday

### /api/user

#### Log-in `Post`

---

Returns json user db Id about an authentic user

- **URL**

  /api/user/login

- **Method**

  `Post`

- **Request Body**

  `{email : 'test@go-fit.com', password : 'go1234'}`

- **Sucess Response:**

  - **Code:** 200

    **Content**: `{ id : 1 }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED

    **Content:** `{info : "존재하지 않는 사용자입니다"}`

  OR

   **Content:** `{info : "비밀번호가 올바르지 않습니다."}`

- **Sample Call:**

```javascript
Axios.post("/api/user/login", data);
```

#### Log-out`Post`

---

- **URL**

  /api/user/logout

- **Method**

  `Post`

- **Sucess Response:**

  - **Code:** 200

    **Content**: `'Success Logout'`

- **Error Response:**

  - **Code:** 205 REFRESH

    **Content:** `'Refresh'`

- **Sample Call:**

```javascript
Axios.post("/api/user/logout");
```

#### Sign-up `Post`

---

- **URL**

  /api/user/signup

- **Method**

  `Post`

- **Request Body**

  `{email: 'test',password: 'test',username: 'testuser',height: 160,weight: 50}`

- **Sucess Response:**

  - **Code:** 200

    **Content**: `{email: 'test',password: 'test',username: 'testuser',height: 160,weight: 50}`

- **Error Response:**

  - **Code:** 409 CONFILCT

    **Content:** `{data : "이미 사용중인 아이디입니다."}`

- **Sample Call:**

```javascript
Axios.post("/api/user/signup", data);
```

#### rank `Get`

---

- **URL**

  /api/user/rank

- **Method**

  `Get`

- **Sucess Response:**

  - **Code:** 200

    **Content**: Shows 10 top users in order of the amount of youtube video time for a week

    ```javascript
    [
      {
        id: 6,
        email: "test6@example.com",
        username: "Casey",
        password:
          "$2b$10$WMY17IJYStRqnLV7fvPsU.eiNnRmS0VNYwkhwPJJSoFDl12sPDcR6",
        height: 176,
        weight: 94,
        lastLoginAt: "2020-05-30T12:58:54.000Z",
        createdAt: "2020-05-30T12:58:54.000Z",
        updatedAt: "2020-05-30T12:58:54.000Z",
        score: 1225,
      },
      {
        id: 7,
        email: "test7@example.com",
        username: "Clara",
        password:
          "$2b$10$2oVaqBw9eGsqvfyc5uvLQuYbNzBtKogX6ZnjkSdBiyt5UKzulvgYa",
        height: 177,
        weight: 98,
        lastLoginAt: "2020-05-30T12:58:54.000Z",
        createdAt: "2020-05-30T12:58:54.000Z",
        updatedAt: "2020-05-30T12:58:54.000Z",
        score: 1140,
      },
      // … the rest omitted
    ];
    ```

* **Error Response:**

  - **Code:** 409 CONFILCT

    **Content:** `{data : "internet error"}`

* **Sample Call:**

```javascript
Axios.get("/api/user/rank");
```

### /api/daylog

#### daylog `Get`

---

Returns json daylog datas per month

- **URL**

  /api/daylog/:date

- **Method**

  `Get`

- **URL Params**

  **Required**

  `date=yyyy-mm-dd`

- **Sucess Response:**

  - **Code:** 200

    **Content**: returns json daylog in yyyy-mm

    ```javascript
    [ [
        {
            "id": 400,
            "message": "go fit!!!!",
            "createdAt": "2020-06-02 01:11:54",
            "updatedAt": "2020-06-02 01:11:54",
            "UserId": 46,
            "Videos": [
                {
                    "id": 400,
                    "url": "url",
                    "youtubeTitle": "title example",
                    "youtubeTime": "979",
                    "createdAt": "2020-06-02 01:11:54",
                    "updatedAt": "2020-06-02 01:11:54",
                    "DaylogId": 400
                }
            ],
            "Healthlog": {
                "id": 400,
                "weight": 58,
                "water": 5,
                "createdAt": "2020-06-02 01:11:54",
                "updatedAt": "2020-06-02 01:11:54",
                "DaylogId": 400
            },
            "Tags": [
                {
                    "id": 17,
                    "name": "example",
                    "createdAt": "2020-06-02 01:11:54",
                    "updatedAt": "2020-06-02 01:11:54",
                    "DaylogTag": {
                        "createdAt": "2020-06-02 01:11:54",
                        "updatedAt": "2020-06-02 01:11:54",
                        "DaylogId": 400,
                        "TagId": 17
                    }
                },
                {
                    "id": 18,
                    "name": "exampletag2",
                    "createdAt": "2020-06-02 01:11:54",
                    "updatedAt": "2020-06-02 01:11:54",
                    "DaylogTag": {
                        "createdAt": "2020-06-02 01:11:54",
                        "updatedAt": "2020-06-02 01:11:54",
                        "DaylogId": 400,
                        "TagId": 18
                    }
                }
            ]
        }
    ]
     //... the rest omitted
     ]
    ```

- **Error Response:**

  - **Code:** 500

    **Content:** `'Network Error'`

- **Sample Call:**

```javascript
Axios.get("/api/daylog/2020-05-30");
```

#### daylog `Post`

---

Returns json daylog datas per month

- **URL**

  /api/daylog/

- **Method**

  `Post`

- **Request Body**

  ```javascript
  {
  		message: 'workout at home!',
  		youtubeTitle:
  			'디저트가 자꾸자꾸 먹고 싶어, 다이어트가 힘들다면 이렇게 하세요 :) (5가지)',
  		youtubeTime: '8:01',
  		weight: 58,
      water : 3,
      tags : ["diet", "home"]
  	}
  ```

- **Sucess Response:**

  - **Code:** 200

    **Content**: `create success!'`

- **Error Response:**

  - **Code:** 500

    **Content:** `'Network Error'`

- **Sample Call:**

```javascript
Axios.post("/api/daylog/2020-05-30", data);
```

#### daylog/edit `Post`

---

Edits a certain daylog

- **URL**

  /api/daylog/edit/:date

- **Method**

  `Post`

- **URL Params**

  **Required**

  `date=yyyy-mm-dd`

- **Request Body**

  ```javascript
  {
  		message: 'workout at home!',
  		youtubeTitle:
  			'디저트가 자꾸자꾸 먹고 싶어, 다이어트가 힘들다면 이렇게 하세요 :) (5가지)',
  		youtubeTime: '8:01',
  		weight: 58,
      water : 3
  	}
  ```

- **Sucess Response:**

  - **Code:** 200

    **Content**: `edit success!'`

- **Error Response:**

  - **Code:** 500

    **Content:** `'Network Error'`

- **Sample Call:**

```javascript
Axios.post("/api/daylog/edit/2020-05-30", data);
```



#### daylog/tag `Get`

---

Edits a certain daylog

- **URL**

  /api/daylog/tag/:tagid

- **Method**

  `get`

- **URL Params**

  **Required**

  `tagid=18`

- **Sucess Response:**

  - **Code:** 200

    **Content**: 

    ```javascript
    [
        {
            "id": 400,
            "message": "go fit!!!!",
            "createdAt": "2020-06-02 01:11:54",
            "updatedAt": "2020-06-02 01:11:54",
            "UserId": 46,
            "Videos": [
                {
                    "id": 400,
                    "url": "url",
                    "youtubeTitle": "title example",
                    "youtubeTime": "979",
                    "createdAt": "2020-06-02 01:11:54",
                    "updatedAt": "2020-06-02 01:11:54",
                    "DaylogId": 400
                }
            ],
            "Healthlog": {
                "id": 400,
                "weight": 58,
                "water": 5,
                "createdAt": "2020-06-02 01:11:54",
                "updatedAt": "2020-06-02 01:11:54",
                "DaylogId": 400
            },
            "Tags": [
                {
                    "id": 18,
                    "name": "exampletag2",
                    "createdAt": "2020-06-02 01:11:54",
                    "updatedAt": "2020-06-02 01:11:54",
                    "DaylogTag": {
                        "createdAt": "2020-06-02 01:11:54",
                        "updatedAt": "2020-06-02 01:11:54",
                        "DaylogId": 400,
                        "TagId": 18
                    }
                }
            ]
        }
    ]
    ```

    

- **Error Response:**

  - **Code:** 500

    **Content:** `'Network Error'`

- **Sample Call:**

```javascript
Axios.get("/api/daylog/tag/18");
```



### /api/calendar

#### calendar `Get`

---

Returns json data of workout dates per month

- **URL**

  /api/calendar/:date

- **Method**

  `Get`

- **URL Params**

  **Required**

  `date=yyyy-mm-dd`

- **Sucess Response:**

  - **Code:** 200

    **Content**: returns json daylog in yyyy-mm

    ```javascript
    //If date = 2020-05-03, the result of May 2020 would be ...
    [
      { createdAt: "2020-05-02T09:24:40.000Z" },
      { createdAt: "2020-05-15T14:24:40.000Z" },
      { createdAt: "2020-05-31T16:24:40.000Z" },
      // ...skip!
    ];
    ```

- **Error Response:**

  - **Code:** 500

    **Content:** `'Network Error'`

- **Sample Call:**

```javascript
Axios.get("/api/calender/2020-05-30");
```

### /api/video

#### video `Get`

---

Returns json data of workout dates per month

- **URL**

  /api/video/:date

- **Method**

  `Get`

- **URL Params**

  **Required**

  `date=yyyy-mm-dd`

- **Sucess Response:**

  - **Code:** 200

    **Content**: returns json daylog in yyyy-mm

    ```javascript
    //If date = 2020-05-30, the result of 30th May 2020 would be ...
    [ { id: 22,
        'Videos.id': 22,
        'Videos.url': 'https://youtu.be/nQlbDogfCpE',
        'Videos.youtubeTitle': 'title 22',
        'Videos.youtubeTime': '17',
        'Videos.createdAt': 2020-05-30T05:24:40.000Z,
        'Videos.updatedAt': 2020-05-30T05:24:40.000Z,
        'Videos.DaylogId': 22 },
      { id: 30,
        'Videos.id': 30,
        'Videos.url': 'https://youtu.be/VVn5IUM8sms',
        'Videos.youtubeTitle': 'title 30',
        'Videos.youtubeTime': '83',
        'Videos.createdAt': 2020-05-30T05:24:40.000Z,
        'Videos.updatedAt': 2020-05-30T05:24:40.000Z,
        'Videos.DaylogId': 30 }
    ]
    ```

- **Error Response:**

  - **Code:** 500

    **Content:** `'Network Error'`

- **Sample Call:**

```javascript
Axios.get("/api/video/2020-05-30");
```

## Feedback

### Development

Want to contribute? Great! :blue_heart:

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

### Bug / Feature Request

If you find a bug (the API couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/codestates/GoFit-server/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/codestates/GoFit-server/issues/new). Please include sample queries and their corresponding results.
