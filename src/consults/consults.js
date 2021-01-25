const pool= require('../config/database');

const vetData=(rBody,rParams,rQuery)=>{
    const data=rBody.concat(rParams.concat(rQuery));
    if(data.length>0){
      return data;
    }
    else{
      return [];
    }
  }

const consult=async(sql,req)=>{
    console.log(req.body,req.params,req.query);
    try {
      const rBody=Object.values(req.body),rParams=Object.values(req.params),rQuery=Object.values(req.query);
      const data=vetData(rBody,rParams,rQuery);
      console.log(data);
      const {rows}=await pool.query(sql,data);
      return rows;
    } catch (e) {
      return {errorCode : e.errno, message : "Error en el servidor"};
    }
  }
  

const getUsers = async (req, res) => {
    res.status(200).json(await consult('SELECT * FROM users ORDER BY id ASC',req));
};

const getUserById = async (req, res) => {
    res.status(200).json(await consult('SELECT * FROM users WHERE id = $1',req));
};

const createUser = async (req, res) => {
    const result =await consult('INSERT INTO users (name, email) VALUES ($1, $2)',req);
    const { name, email } = req.body;
    result.length==0 ?(
    res.json({message: 'User Added successfully', body: {user: {name, email}}})
    )
    :(res.send(result));
};

const updateUser = async (req, res) => {
    const result =await consult('UPDATE users SET name = $1, email = $2 WHERE id = $3',req);
    result.length==0 ?(
        res.json('User Updated Successfully')
        )
        :(res.send(result));
};

const deleteUser = async (req, res) => {
    const result =await consult('DELETE FROM users where id = $1',req);
    result.length==0 ?(
        res.json(`User ${req.params.id} deleted Successfully`)
        )
        :(res.send(result));
};

module.exports = {getUsers, getUserById, createUser, updateUser, deleteUser};
