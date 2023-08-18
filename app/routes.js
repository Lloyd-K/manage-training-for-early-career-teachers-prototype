//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.get('/participants', (req, res) => {

  let ectsBeingTrained = []

  for (mentor of req.session.data.mentors) {
    for (teacher of mentor.earlyCareerTeachers) {

      teacher.mentor = {
        name: mentor.name,
        id: mentor.id
      }
      ectsBeingTrained.push(teacher)
    }


  }

  ectsBeingTrained.push(req.session.data.teachersWithoutMentors)

  ectsBeingTrained = ectsBeingTrained.flat()

  ectsBeingTrained = ectsBeingTrained.sort(function(teacherA, teacherB) {
    if (!teacherA.inductionStartDate) {
      return -1
    }

    if (!teacherB.inductionStartDate) {
      return 1
    }

    if (teacherA.inductionStartDate > teacherB.inductionStartDate) {
      return -1
    } else {
      return 1
    }
  })

  res.render('participants', {
    ectsBeingTrained
  })

})

router.get('/early-career-teachers/:id', (req, res) => {
  const { id } = req.params

  const mentor = req.session.data.mentors.find(function(mentor) {
    return mentor.earlyCareerTeachers.find(function(teacher) {
      return teacher.id === id
    })
  })

  const teacher = req.session.data.mentors.map(function(mentor) {
    return mentor.earlyCareerTeachers
  }).flat().find(function(teacher) {
    return teacher.id === id
  })

  res.render('early-career-teacher', {
    id,
    teacher,
    mentor
  })
})

router.get('/early-career-teachers/:id', (req, res) => {
  const { id } = req.params

  const mentor = req.session.data.mentors.find(function(mentor) {
    return mentor.earlyCareerTeachers.find(function(teacher) {
      return teacher.id === id
    })
  })

  const teacher = req.session.data.mentors.map(function(mentor) {
    return mentor.earlyCareerTeachers
  }).flat().find(function(teacher) {
    return teacher.id === id
  })

  res.render('early-career-teacher', {
    id,
    teacher,
    mentor
  })
})

router.get('/early-career-teachers/:id/transfer', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.mentors.map(function(mentor) {
    return mentor.earlyCareerTeachers
  }).flat().find(function(teacher) {
    return teacher.id === id
  })

  res.render('transfer', {
    id,
    teacher
  })
})

router.get('/early-career-teachers/:id/transfer-date', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.mentors.map(function(mentor) {
    return mentor.earlyCareerTeachers
  }).flat().find(function(teacher) {
    return teacher.id === id
  })

  res.render('transfer-date', {
    id,
    teacher
  })
})

router.get('/early-career-teachers/:id/transfer-check', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.mentors.map(function(mentor) {
    return mentor.earlyCareerTeachers
  }).flat().find(function(teacher) {
    return teacher.id === id
  })

  res.render('transfer-check', {
    id,
    teacher
  })
})

router.get('/early-career-teachers/:id/transfer-confirmed', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.mentors.map(function(mentor) {
    return mentor.earlyCareerTeachers
  }).flat().find(function(teacher) {
    return teacher.id === id
  })

  res.render('transfer-confirmed', {
    id,
    teacher
  })
})


router.get('/mentors/:id', (req, res) => {
  const { id } = req.params

  const mentor = req.session.data.mentors.find(function(mentor) {
    return mentor.id === id
  })

  res.render('mentor', {
    id,
    mentor
  })
})

router.get('/completed/:id', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.completedInduction.find(function(teacher) {
    return teacher.id === id
  })

  res.render('completed', {
    id,
    teacher
  })
})

router.get('/no-longer-training/:id', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.noLongerTraining.find(function(teacher) {
    return teacher.id === id
  })

  res.render('no-longer-training', {
    id,
    teacher
  })
})
