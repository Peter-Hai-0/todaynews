# Domain

1. User：
    * _id: Object
    * name: String  唯一（可用于登陆吗）
    * password: String  最好哈希
    * phoneNumber: String   需要验证（用于登录）
    * token 用于鉴权
    * sex
    * head_url  头像链接
2.  

# API
1. Session
   * POST: phoneNumber, password<br>Response: 200:{sessionToken}, 403
   * DELETE: sessionToken<br>Response: 200, 403

2. User
   * POST: name, password, phoneNumber<br> Response: 200, 403

3. userNews
   * GET: name=?<br> Response: 200{news[{_id, title}...]}, 404
   * PATCH: _id, title, detail, writer<br> Resonse: 200, 403

4. userLiked
   * GET: name, _id(News)<br> Response: 200, 403
   * POST: name, _id(News)<br> Response: 200, 403
   * DELETE: name, _id(News)<br> Response: 200, 403
