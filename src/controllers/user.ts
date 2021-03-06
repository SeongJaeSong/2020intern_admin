import * as express from 'express';
import userQuery from '../dao/userDAO'
import { search } from './keyword';
import { pagination, checkParameter } from '../lib/lib'

const router = express.Router();

const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUser');
  if (checkParameter([req.body.id, req.body.name, req.body.password, req.body.email, req.body.type, req.body.permission])) {
    res.status(400).send(
      {
        'message': 'create user'
      }
    )
  }
  const data = 
  [
    req.body.id,
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.image_url?req.body.image_url:null,
    req.body.description?req.body.description:null,
    req.body.company?req.body.company:null,
    req.body.permission,
    req.body.type
  ]
  try {
    const result = await userQuery.createUser(data);

    res.status(200).send({
      'message': 'create user success' 
    });
  } catch (e) {
    res.status(500).send()
  }
};

const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: getUsers');  
  if (checkParameter([req.query.page, req.query.range])) {
    res.status(400).send(
      {
        'message': 'get users'
      }
    )
  }
  const page = parseInt(req.query.page.toString());
  const range = parseInt(req.query.range.toString());

  let extraQuery = '';
  const query = req.query;
  let urlPattern = '?';

  if (Object.keys(query).length !== 0) {
    extraQuery += ' WHERE USN >= 0 ';
        
    if (query.searchType !== null && query.searchType !== 'all' && query.searchType !== undefined) {
      extraQuery += `AND type = ${query.searchType} `;
      urlPattern += `&searchType=${query.searchType}`;
    }

    if (query.searchOption !== null && query.searchWord !== null && query.searchOption !== undefined && 
      query.searchWord !== undefined) {
      const searchWord = query.searchWord.toString().trim();
      extraQuery += `AND ${query.searchOption} LIKE '%${searchWord}%' `;
      urlPattern += `&searchOption=${query.searchOption}&searchWord=${searchWord}`;
    }

    if (query.searchPermission !== null && query.searchPermission !== 'all' && query.searchPermission !== undefined) {
      extraQuery += `AND permission = ${query.searchPermission} `;
      urlPattern += `&searchPermission=${query.searchPermission}`;
    }
  }
  
  try {
    let result = pagination(await userQuery.getUsers(extraQuery, page), range, page);
    let url = new Array();

    for (let i = result[0][0]['startPage']; i <= result[0][0]['endPage']; ++i) {
      url.push(urlPattern + `&page=${i}&range=${range}`);
    }
    
    res.status(200).render('user/user',
      {
        'message': 'get users success',
        'page': result[0],
        'users': result[1],
        'url': url
      }
    );
  } catch (e) {
    res.status(500).send();
  }
};

const getUser = async (req: express.Request, res: express.Response, 
  next: express.NextFunction) => {
  console.log('controller: getUser');
  if (checkParameter([req.params.usn])) {
    res.status(400).send(
      {
        'message': 'get user'
      }
    )
  }
  const data = 
  [
    parseInt(req.params.usn)
  ];
  try {
    let result = await userQuery.getUser(data);
    let keywordResult = await userQuery.getUserKeywords(data);
    let careerID: Array<Number> = new Array();
    let career: Array<String | Number> = new Array(); 
    result.map( (current, index, result) => {
      if (current.careerID != null) {
        careerID.push(current.careerID);
      }
      if (current.career != null) {
        career.push(current.career);
      }
    })
    result = [result[0]];
    result[0].careerID = careerID;
    result[0].career = career;
    result[0].keywords = keywordResult;

    res.status(200).render('user/userDetail' ,
      {
        'message': 'success',
        'user': result
      }
    )
  } catch (e) {
    res.status(500).send()
  }
};

const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteUser');
  if (req.params.usn) {
    res.status(400).send(
      {
        'message': 'delete user'
      }
    )
  }
  const data = 
  [
    parseInt(req.params.usn)
  ];
  try {
    const result = await userQuery.deleteUser(data);
    res.status(200).send(
      {
      'message': 'delete user success',
      }
    );
  } catch (e) {
    res.status(500).send({
      'message': 'delete user fail - internal error'
    })
  }
};

const modifyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: modifyUser');
  if (checkParameter([req.body.email, req.body.name, req.body.permission, req.body.type])) {
    res.status(400).send(
      {
        'message': 'modify user'
      }
    )
  }
  
  let data;
  let result;
  try {
    if (req.body.password === null || req.body.password === undefined || req.body.password === '') {
    data = 
    [
      req.body.name,
      req.body.email,
      req.body.image_url,
      req.body.description,
      req.body.company,
      req.body.permission,
      req.body.type,
      parseInt(req.params.usn)
    ];
    result = await userQuery.modifyUserWithoutPW(data);
    res.status(200).send(
        {
          'message': 'modify user without password success'
        }
      );
    console.log('controller: modifyUserWithoutPW');
  } else {
    data =
    [
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.image_url,
      req.body.description,
      req.body.company,
      req.body.permission,
      req.body.type,
      parseInt(req.params.usn)
    ];
    result = await userQuery.modifyUser(data);
    res.status(200).send(
      {
        'message': 'modify user success'
      }
    );}
  } catch (e) {
    res.status(500).send()
  }
};

const createUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUserCareer');
  if (checkParameter([req.params.usn, req.body.content])) {
    res.status(400).send(
      {
        'message': 'create user career'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.content
  ];
  try {
    const result = await userQuery.createUserCareer(data);
    const content = req.body.content;
    res.status(200).send(
      {
        'message': 'create user career success',
        'careerID': result.insertId,
        'content': content
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const modifyUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: modifyUserCareer');
  if (checkParameter([req.body.id, req.body.content])) {
    res.status(400).send(
      {
        'message': 'modify user career'
      }
    )
  }
  const data =
  [
    req.body.content,
    req.body.id 
  ];
  try {
    const result = await userQuery.modifyUserCareer(data);
    res.status(200).send(
      {
        'message': 'modify user career success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const deleteUserCareer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteUserCareer');
  if (checkParameter([req.body.id])) {
    res.status(400).send(
      {
        'message': 'delete user career'
      }
    )
  }
  const data = 
  [
    req.body.id
  ];
  try {
    const result = await userQuery.deleteUserCareer(data);
    res.status(200).send(
      {
        'message': 'delete user career success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const createUserRecommendKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUserRecommendKeyword');
  if (checkParameter([req.params.usn, req.body.id])) {
    res.status(400).send(
      {
        'message': 'create user recommend keyword'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.createUserRecommendKeyword(data);
    res.status(200).send(
      {
        'message': 'create user recommend keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const deleteUserRecommendKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: deleteUserRecommendKeyword');
  if (checkParameter([req.params.usn, req.body.id])) {
    res.status(400).send(
      {
        'message': 'delete user recommend keyword'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.deleteUserRecommendKeyword(data);
    res.status(200).send(
      {
        'message': 'delete user recommend keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const createUserTotalKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('controller: createUserTotalKeyword');
  if (checkParameter([req.params.usn, req.body.id])) {
    res.status(400).send(
      {
        'message': 'create user total keyword'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.createUserTotalKeyword(data);
    res.status(200).send(
      {
        'message': 'create user total keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
}

const deleteUserTotalKeyword = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (checkParameter([req.params.usn, req.body.id])) {
    res.status(400).send(
      {
        'message': 'delete user total keyword'
      }
    )
  }
  const data =
  [
    parseInt(req.params.usn),
    req.body.id
  ]
  try {
    const result = await userQuery.deleteUserTotalKeyword(data);
    res.status(200).send(
      {
        'message': 'delete user total keyword success'
      }
    );
  } catch (e) {
    res.status(500).send()
  }
  console.log('controller: deleteUserTotalKeyword');
}

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:usn', getUser);
router.delete('/:usn', deleteUser);
router.put('/:usn', modifyUser);
router.post('/career/:usn', createUserCareer);
router.put('/career/:usn', modifyUserCareer);
router.delete('/career/:usn', deleteUserCareer);
router.post('/keyword/recommend/:usn', createUserRecommendKeyword);
router.delete('/keyword/recommend/:usn', deleteUserRecommendKeyword);
router.post('/keyword/total/:usn', createUserTotalKeyword);
router.delete('/keyword/total/:usn', deleteUserTotalKeyword);
export = router;
