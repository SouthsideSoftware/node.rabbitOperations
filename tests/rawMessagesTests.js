"use strict";

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var RawMessage = require('../messageBus/common/rawMessage.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var path = require('path');

chai.use(chaiAsPromised);

describe('load', function(){
    it('should return an error when the file does not exist', function() {
            var rawMessage = new RawMessage();
            return rawMessage.load('foo').should.be.rejected;
        });

    it('should load the body from the file', function(done){
        var rawMessage = new RawMessage();
        var fileName = path.resolve(__dirname, '../testRig/messageTemplates/error.json');
        rawMessage.load(fileName).then(function(){
            rawMessage.body.should.equal('{"Ids":["afecc831-34d4-47ca-b43b-56eb90d4e3b6"]}');
            done();
        }).catch(function(err){
            done(err);
        });
    });

    it('should load the headers from the file', function(done){
        var headers = {};
        headers["NServiceBus.MessageId"] =  "695742b4-58d0-4e3a-83a9-a4120116c48d";
        headers["NServiceBus.CorrelationId"] = "695742b4-58d0-4e3a-83a9-a4120116c48d";
        headers["NServiceBus.MessageIntent"] = "Send";
        headers["NServiceBus.Version"] = "5.0.3";
        headers["NServiceBus.TimeSent"] = "2014-12-31 16:54:57:747221 Z";
        headers["NServiceBus.ContentType"] = "application/json";
        headers["NServiceBus.EnclosedMessageTypes"] = "Autobahn.Configurations.Contracts.Commands.ValidateConfigurations, Autobahn.Configurations.Contracts, Version=1.1.12.0, Culture=neutral, PublicKeyToken=null";
        headers["WinIdName"] = "";
        headers["NServiceBus.ConversationId"] = "d95771ad-eb89-46b3-b8b3-a4120116c48d";
        headers["NServiceBus.OriginatingMachine"] = "QA1-THD-WEB-1";
        headers["NServiceBus.OriginatingEndpoint"] = "Autobahn.Configuration.WebAPI";
        headers["$.diagnostics.originating.hostid"] = "e2ee89227f61d89c49f32dec35116165";
        headers["NServiceBus.RabbitMQ.CallbackQueue"] = "Autobahn.Configuration.Host.QA1-APP-01";
        headers["NServiceBus.ReplyToAddress"] = "Autobahn.Configuration.WebAPI";
        headers["$.diagnostics.hostid"] = "dd0264d6ebaaa79264f4875f0cd3cc9c";
        headers["$.diagnostics.hostdisplayname"] = "QA1-APP-01";
        headers["NServiceBus.ExceptionInfo.ExceptionType"] = "Raven.Abstractions.Exceptions.ConcurrencyException";
        headers["NServiceBus.ExceptionInfo.Message"] = "PUT attempted on : ConfigurationResponseDocuments/afecc831-34d4-47ca-b43b-56eb90d4e3b6 while it is being locked by another transaction";
        headers["NServiceBus.ExceptionInfo.Source"] = "Raven.Client.Lightweight";
        headers["NServiceBus.ExceptionInfo.StackTrace"] = "   at Raven.Client.Connection.ServerClient.DirectBatch(IEnumerable`1 commandDatas, OperationMetadata operationMetadata)\r\n   at Raven.Client.Connection.ServerClient.<>c__DisplayClass97.<Batch>b__96(OperationMetadata u)\r\n   at Raven.Client.Connection.ReplicationInformer.TryOperation[T](Func`2 operation, OperationMetadata operationMetadata, OperationMetadata primaryOperationMetadata, Boolean avoidThrowing, T& result, Boolean& wasTimeout)\r\n   at Raven.Client.Connection.ReplicationInformer.ExecuteWithReplication[T](String method, String primaryUrl, OperationCredentials primaryCredentials, Int32 currentRequest, Int32 currentReadStripingBase, Func`2 operation)\r\n   at Raven.Client.Connection.ServerClient.ExecuteWithReplication[T](String method, Func`2 operation)\r\n   at Raven.Client.Connection.ServerClient.Batch(IEnumerable`1 commandDatas)\r\n   at Raven.Client.Document.DocumentSession.SaveChanges()\r\n   at Autobahn.Configurations.Tasks.Handlers.NServiceBus.ValidateConfigurationsHandler.Handle(ValidateConfigurations message) in z:\\BuildAgent\\Work\\fdf076c7251fe009\\app\\Autobahn.Configurations.Tasks\\Handlers\\NServiceBus\\ValidateConfigurationsHandler.cs:line 74\r\n   at lambda_method(Closure , Object , Object )\r\n   at NServiceBus.Unicast.MessageHandlerRegistry.Invoke(Object handler, Object message, Dictionary`2 dictionary) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\MessageHandlerRegistry.cs:line 126\r\n   at NServiceBus.Unicast.MessageHandlerRegistry.InvokeHandle(Object handler, Object message) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\MessageHandlerRegistry.cs:line 84\r\n   at NServiceBus.LoadHandlersBehavior.<Invoke>b__1(Object handlerInstance, Object message) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Behaviors\\LoadHandlersBehavior.cs:line 41\r\n   at NServiceBus.InvokeHandlersBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Behaviors\\InvokeHandlersBehavior.cs:line 24\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.SetCurrentMessageBeingHandledBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Behaviors\\SetCurrentMessageBeingHandledBehavior.cs:line 17\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.LoadHandlersBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Behaviors\\LoadHandlersBehavior.cs:line 46\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.ApplyIncomingMessageMutatorsBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\MessageMutator\\ApplyIncomingMessageMutatorsBehavior.cs:line 23\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.ExecuteLogicalMessagesBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Messages\\ExecuteLogicalMessagesBehavior.cs:line 24\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.CallbackInvocationBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Behaviors\\CallbackInvocationBehavior.cs:line 23\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.DeserializeLogicalMessagesBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Messages\\DeserializeLogicalMessagesBehavior.cs:line 49\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.ApplyIncomingTransportMessageMutatorsBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\MessageMutator\\ApplyIncomingTransportMessageMutatorsBehavior.cs:line 20\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.SubscriptionReceiverBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Subscriptions\\MessageDrivenSubscriptions\\SubscriptionReceiverBehavior.cs:line 31\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.UnitOfWorkBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\UnitOfWork\\UnitOfWorkBehavior.cs:line 43\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.Transports.RabbitMQ.OpenPublishChannelBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\41ea81d808fdfd62\\src\\NServiceBus.RabbitMQ\\OpenPublishChannelBehavior.cs:line 19\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.ChildContainerBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Behaviors\\ChildContainerBehavior.cs:line 17\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.ProcessingStatisticsBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Monitoring\\ProcessingStatisticsBehavior.cs:line 23\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.AuditBehavior.Invoke(IncomingContext context, Action next) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Audit\\AuditBehavior.cs:line 20\r\n   at NServiceBus.BehaviorChain`1.Invoke() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\BehaviorChain.cs:line 39\r\n   at NServiceBus.Pipeline.PipelineExecutor.Execute[T](BehaviorChain`1 pipelineAction, T context) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\PipelineExecutor.cs:line 127\r\n   at NServiceBus.Pipeline.PipelineExecutor.InvokePipeline[TContext](IEnumerable`1 behaviors, TContext context) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\PipelineExecutor.cs:line 74\r\n   at NServiceBus.Pipeline.PipelineExecutor.InvokeReceivePhysicalMessagePipeline() in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Pipeline\\PipelineExecutor.cs:line 100\r\n   at NServiceBus.Unicast.UnicastBus.TransportMessageReceived(Object sender, TransportMessageReceivedEventArgs e) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\UnicastBus.cs:line 826\r\n   at NServiceBus.Unicast.Transport.TransportReceiver.OnTransportMessageReceived(TransportMessage msg) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Transport\\TransportReceiver.cs:line 410\r\n   at NServiceBus.Unicast.Transport.TransportReceiver.ProcessMessage(TransportMessage message) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Transport\\TransportReceiver.cs:line 343\r\n   at NServiceBus.Unicast.Transport.TransportReceiver.TryProcess(TransportMessage message) in c:\\BuildAgent\\work\\1b05a2fea6e4cd32\\src\\NServiceBus.Core\\Unicast\\Transport\\TransportReceiver.cs:line 227\r\n   at NServiceBus.Transports.RabbitMQ.RabbitMqDequeueStrategy.ConsumeMessages(Object state) in c:\\BuildAgent\\work\\41ea81d808fdfd62\\src\\NServiceBus.RabbitMQ\\RabbitMqDequeueStrategy.cs:line 186";
        headers["NServiceBus.FailedQ"] = "Autobahn.Configuration.Host@QA1-APP-01";
        headers["NServiceBus.TimeOfFailure"] = "2014-12-31 16:56:02:891973 Z";
        headers["NServiceBus.Retries.Timestamp"] = "2014-12-31 16:54:58:516940 Z";
        headers["NServiceBus.Timeout.RouteExpiredTimeoutTo"] = "Autobahn.Configuration.Host@QA1-APP-02";
        headers["NServiceBus.Timeout.Expire"] = "2014-12-31 16:56:01:204458 Z";
        var rawMessage = new RawMessage();
        var fileName = path.resolve(__dirname, '../testRig/messageTemplates/error.json');
        rawMessage.load(fileName).then(function(){
            rawMessage.headers.should.deep.equal(headers);
            done();
        }).catch(function(err){
            done(err);
        });
    });
});
