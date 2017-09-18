const models = require('../../db/models');

module.exports.save = (req, res) => {
  models.Profile.where({username: req.body.receiver}).fetch({columns: ['id']})
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      profile = profile.toJSON();
      models.Project.where({creator_id: profile.id, name: req.body.project}).fetch({columns: ['id']})
        .then(project => {
          project = project.toJSON();
          models.Message.forge({
            project_id: project.id,
            receiver_id: profile.id,
            sender_id: req.user.id,
            text: req.body.message,
            subject: req.body.subject,
            viewed: false
          }).save();
        });
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.view = (req, res) => {
  models.Message.where({
    receiver_id: req.params.receiverId
  }).fetch()
    .then(messages => {
      if (!messages) {
        throw messages;
      }
      return messages.save({viewed: true}, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getMessages = (req, res) => {
  let allMessages = {};
  models.Message.where({receiver_id: req.user.id}).orderBy('created_at', 'DESC').fetchAll({withRelated: ['sender', 'project']})
    .then(received => {
      received = received.toJSON();
      allMessages.receivedMessages = received;
      models.Message.where({sender_id: req.user.id}).orderBy('created_at', 'DESC').fetchAll({withRelated: ['receiver', 'project']})
        .then(sent => {
          sent = sent.toJSON();
          allMessages.sentMessages = sent;
          res.status(200).send(allMessages);
        });
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
