# Go-fit Server API 🤸

Go-fit is a RESTful server API for a daily log web-application, providing the main functions as log-in, daily logs with multi-media, weekly or monthly rankings and schduled email reminder.



## Features

* Log-in/out, sign-up
* Daily log with a youtube video clip
* Tag filtering
* See a weekly, monthly, yearly ranking
* Send a remider email



## Setup

Clone this repo to your desktop and run `npm install ` to install all the dependencies. You might want to look into ` config.json `to make change the port you want to use and set up a reminder email account.



## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:7777

- /api/user

  : log-in, log-out, sign-up, rank

- /api/daylog

  : daylog, tag

- /api/video

  : youtube video info

- /api/calender

  : workoutday

  

### /api/user

#### Log-in

----

Returns json user db Id about an authentic user

* **URL**

  /api/user/login

* **Method**

  `Post`

* **Request Body**

  `{email : 'test@go-fit.com', password : 'go1234'}`

* **Sucess Response:**

  - **Code:** 200

    **Content**: `{ id : 1 }` 

* **Error Response:**

  - **Code:** 401 UNAUTHORIZED

    **Content:** `{info : "존재하지 않는 사용자입니다"}`

  OR

  ​		**Content:** `{info : "비밀번호가 올바르지 않습니다."}`

* **Sample Call:**

```javascript
Axios.post('/api/user/login', data);
```



#### Log-out

-----

* **URL**

  /api/user/logout

* **Method**

  `Post`

* **Sucess Response:**

  - **Code:** 200

    **Content**: `'Success Logout'` 

* **Error Response:**

  - **Code:** 205 REFRESH 

    **Content:** `'Refresh'`

* **Sample Call:**

```javascript
Axios.post('/api/user/logout');
```



#### Sign-up

-----

* **URL**

  /api/user/signup

* **Method**

  `Post`

* **Request Body**

  `{email: 'test',password: 'test',username: 'testuser',height: 160,weight: 50}`

* **Sucess Response:**

  - **Code:** 200

    **Content**: `{email: 'test',password: 'test',username: 'testuser',height: 160,weight: 50}` 

* **Error Response:**

  - **Code:** 409 CONFILCT 

    **Content:** `{data : "이미 사용중인 아이디입니다."}`

* **Sample Call:**

```javascript
Axios.post('/api/user/signup', data);
```



#### rank

-----

* **URL**

  /api/user/rank

* **Method**

  `Get`

* **Sucess Response:**

  - **Code:** 200

    **Content**: Shows 10 top users in order of the amount of youtube video time for a week

    ```javascript
    [ {
            "id": 6,
            "email": "test6@example.com",
            "username": "Casey",
            "password": "$2b$10$WMY17IJYStRqnLV7fvPsU.eiNnRmS0VNYwkhwPJJSoFDl12sPDcR6",
            "height": 176,
            "weight": 94,
            "lastLoginAt": "2020-05-30T12:58:54.000Z",
            "createdAt": "2020-05-30T12:58:54.000Z",
            "updatedAt": "2020-05-30T12:58:54.000Z",
            "score": 1225
        },
        {
            "id": 7,
            "email": "test7@example.com",
            "username": "Clara",
            "password": "$2b$10$2oVaqBw9eGsqvfyc5uvLQuYbNzBtKogX6ZnjkSdBiyt5UKzulvgYa",
            "height": 177,
            "weight": 98,
            "lastLoginAt": "2020-05-30T12:58:54.000Z",
            "createdAt": "2020-05-30T12:58:54.000Z",
            "updatedAt": "2020-05-30T12:58:54.000Z",
            "score": 1140
        },
    // … the rest omitted
    ]
    ```

    

* **Error Response:**

  - **Code:** 409 CONFILCT 

    **Content:** `{data : "internet error"}`

* **Sample Call:**

```javascript
Axios.get('/api/user/rank');
```





### /api/daylog

#### daylog `Get`

----

Returns json daylog datas per month

* **URL**

  /api/daylog/:date

* **Method**

  `Get` 

* **URL Params**

  **Required**

  `date=yyyy-mm-dd`

* **Sucess Response:**

  - **Code:** 200

    **Content**: returns json daylog in yyyy-mm

    ```javascript
    [ { id: 22,
        message: 'nailed it',
        createdAt: 2020-05-30T05:24:40.000Z,
        updatedAt: 2020-05-30T05:24:40.000Z,
        UserId: 1 },
      { id: 30,
        message: 'excited',
        createdAt: 2020-05-30T05:24:40.000Z,
        updatedAt: 2020-05-30T05:24:40.000Z,
        UserId: 1 },
     //... the rest omitted
     ]
    ```

* **Error Response:**

  - **Code:** 500 

    **Content:** `'Network Error'`

* **Sample Call:**

```javascript
Axios.get('/api/daylog/2020-05-30'); 
```



#### daylog `Post`

----

Returns json daylog datas per month

* **URL**

  /api/daylog/

* **Method**

  `Post` 

* **Request Body**

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

* **Sucess Response:**

  - **Code:** 200

    **Content**: `create success!'`

* **Error Response:**

  - **Code:** 500 

    **Content:** `'Network Error'`

* **Sample Call:**

```javascript
Axios.post('/api/daylog/2020-05-30', data); 
```



#### daylog/edit `Post`

----

Edits a certain daylog

* **URL**

  /api/daylog/edit/:date

* **Method**

  `Post` 

* **URL Params**

  **Required**

  `date=yyyy-mm-dd`

* **Request Body**

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

* **Sucess Response:**

  - **Code:** 200

    **Content**: `edit success!'`

* **Error Response:**

  - **Code:** 500 

    **Content:** `'Network Error'`

* **Sample Call:**

```javascript
Axios.post('/api/daylog/edit/2020-05-30', data); 
```

