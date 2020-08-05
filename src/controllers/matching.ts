import * as express from 'express';

const router = express.Router();

const createMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data = [
    req.body.name
  ];
  //   const result = await categoryQuery.createCategory(data);
  res.status(200).send(
    {
      'message': 'create category success',
    }
  );
  console.log('controller: createMatching');
};

const deleteMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data =
    [
      req.params.id
    ];
  res.status(200).send(
    {
      'message': 'delete category success',
    }
  )
  console.log('controller: deleteCategory');
};

const updateForm = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.params.id);

  let result = {
      id: req.params.id,
      mentor: 0,
      mentee: 1,
      req_date: '2020/07/30',
      is_checked: false,
      state: 0,
    };

  res.status(200).render('matching/matchingUpdate',
    {
      message: 'get update form success',
      matching: result
    }
  )
  console.log('controller: updateMatching');
}

const getMatching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let result = [
    {
      id: 0,
      mentor: 0,
      mentee: 1,
      req_date: '2020/07/30',
      is_checked: false,
      state: 0,
    },
    {
      id: 1,
      mentor: 3,
      mentee: 5,
      req_date: '2020/08/02',
      is_checked: false,
      state: 0,
    },
  ]

  res.status(200).render('matching/matching',
    {
      message: 'get category success',
      matching: result
    }
  )
  console.log('controller: getMatching');
};

const getMatchingDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let result = {
      id: 0,
      mentor: 0,
      mentee: 1,
      req_date: '2020/07/30',
      is_checked: false,
      state: 0,
    };

  res.status(200).render('matching/matchingDetail',
    {
      message: 'get category success',
      matching: result
    }
  )
  console.log('controller: getMatching');
};

router.get('/', getMatching);
router.get('/:id', getMatchingDetail);
router.get('/update/:id', updateForm);
router.post('/', createMatching);
router.delete('/:id', deleteMatching);

export = router;