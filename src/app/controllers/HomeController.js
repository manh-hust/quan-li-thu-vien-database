const Users = require('../models/user')
const axios = require('axios');
const Client = require('../../config/pg_db/client')

class HomeController {
    index(req, res, next) {
        const userID = req.cookies.userID;
        Users.findByPk(userID)
        .then( user => {
            if(user){
                res.locals.user = user.dataValues
            }
        res.render('home/home',{
            data: [
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            },
            {
                link:'https://thuvienhanoi.org.vn/Upload/2021/10/21/z2865510158945_56054ec033dcddf6d586ab059d3509e6_2021Oct21_044632498.jpg',
                text: 'Thư mục sách mới tháng 11'
            }
        ]
        })
    })}
    tutorial(req, res, next) {
        res.render('home/tutorial');
    }
    news(req, res, next) {
        const posts = [
            {
                "albumId": 1,
                "id": 1,
                "title": "accusamus beatae ad facilis cum similique qui sunt",
                "url": "https://via.placeholder.com/600/92c952",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
            },
            {
                "albumId": 1,
                "id": 2,
                "title": "reprehenderit est deserunt velit ipsam",
                "url": "https://via.placeholder.com/600/771796",
                "thumbnailUrl": "https://via.placeholder.com/150/771796"
              },
              {
                "albumId": 1,
                "id": 3,
                "title": "officia porro iure quia iusto qui ipsa ut modi",
                "url": "https://via.placeholder.com/600/24f355",
                "thumbnailUrl": "https://via.placeholder.com/150/24f355"
              },
              {
                "albumId": 1,
                "id": 4,
                "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
                "url": "https://via.placeholder.com/600/d32776",
                "thumbnailUrl": "https://via.placeholder.com/150/d32776"
              },
              {
                "albumId": 1,
                "id": 5,
                "title": "natus nisi omnis corporis facere molestiae rerum in",
                "url": "https://via.placeholder.com/600/f66b97",
                "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
              },
              {
                "albumId": 1,
                "id": 6,
                "title": "accusamus ea aliquid et amet sequi nemo",
                "url": "https://via.placeholder.com/600/56a8c2",
                "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
              },
        ]
        res.render('home/news', {
            posts: posts
        })
    }
    test(req, res, next){
        Client.query('select * from teaching, subject where teaching.subject_id = subject.subject_id')
        .then(user => {
            res.send(user.rows)
        })
        .catch(next)
    }
}
module.exports = new HomeController();
