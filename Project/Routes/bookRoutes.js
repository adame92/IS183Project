var express = require('express');

var routes = function(Customer){
    var customerRouter = express.Router();


customerRouter.route('/')
    .post(function(req, res){
        var customer = new Customer(req.body);

        customer.save();
        res.status(201).send(customer);
    })
    .get(function(req,res){
        
        var query = {};

        if(req.query.Email)
        {
            query.Email = req.query.Email;
        }
        Customer.find(query, function(err,customers){
            if(err)
                res.status(500).send(err);
            else
                res.json(customers);
        });
    });
customerRouter.use('/:customerId', function(req, res, next){
     Customer.findById(req.params.customerId, function(err,customer){
            if(err)
                res.status(500).send(err);
            else if(customer)
            {
                req.customer = customer;
                next();
            }
            else
            {
                res.status(404).send('no customer found');
            }
        });
});
customerRouter.route('/:customerId')
    .get(function(req,res){
        res.json(req.customer);
    })
    .put(function(req, res){
                req.customer.First = req.body.First;
                req.customer.Last = req.body.Last;
                req.customer.Email = req.body.Email;
                req.customer.read = req.body.read;
                req.customer.save(function(err){
                    if(err)
                        res.status(500).send(err);
                    else{
                        res.json(req.customer); 
                    }
            });
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;
        for(var p in req.body)
        {
            req.customer[p] = req.body[p];
        }
        req.customer.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
               res.json(req.customer); 
            }
        });
    })
    .delete(function(req,res){
        req.customer.remove(function(err){
            if(err)
                res.status(500).send(err);
            else{
               res.status(204).send('Removed');
            }
        });
    });
return customerRouter;
};

module.exports = routes;