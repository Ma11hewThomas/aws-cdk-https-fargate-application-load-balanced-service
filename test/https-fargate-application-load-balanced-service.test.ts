import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { HttpsFargateApplicationLoadBalancedServiceStack } from "../lib/https-fargate-application-load-balanced-service-stack";
const props = {
    certificateDomainName: "example.com",
    hostedZoneName: "example.com",
    hostedZoneId: "Z000000000000",
    aRecordName: "example.com",
};

let template: Template;

beforeAll(() => {
  const app = new App();
  const stack = new HttpsFargateApplicationLoadBalancedServiceStack(app, "MyTestStack", props);
  template = Template.fromStack(stack);
});

test("Stack has cluster", () => {
  template.hasResource("AWS::ECS::Cluster", {});
});

test("stack has service", () => {
  template.hasResource("AWS::ECS::Service", {});
});

test("stack has task definition", () => {
    template.hasResource("AWS::ECS::TaskDefinition", {});
    }
);

test("stack has certificate", () => {
    template.hasResource("AWS::CertificateManager::Certificate", {})
}
);

test("stack has a record", () => {
    template.hasResource("AWS::Route53::RecordSet", {});
}
);

test("stack has load balancer", () => {
    template.hasResource("AWS::ElasticLoadBalancingV2::LoadBalancer", {});
}
);