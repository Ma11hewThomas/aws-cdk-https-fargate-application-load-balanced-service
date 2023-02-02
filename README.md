# Enabling HTTPS on an ApplicationLoadBalancedFargateService in AWS CDK (Typescript)
An example showing the recommended way of enabling HTTPS on an ApplicationLoadBalancedFargateService.

This example creates a Fargate service with an Application Load Balancer (ALB). The ALB is configured to listen on port 443 and forward requests to the Fargate service on port 80. The ALB is configured to use a self-signed certificate. 


# Prerequisites
- AWS CDK and Typescript should be installed on your system.

- AWS credentials should be configured on your system.

- A domain name registered with Route53 with a hosted zone.

# Steps
Add properties to the stack to specify the domain name and hosted zone.
```typescript
new HttpsFargateApplicationLoadBalancedServiceStack(app, 'HttpsFargateApplicationLoadBalancedServiceStack', {
  certificateDomainName: "*.example.com",
  hostedZoneName: "aws.example.com",
  hostedZoneId: "Z000000000000",
  aRecordName: "aws.example.com",
});
```

 - certificateDomainName: The domain name for the certificate. This is the domain name that will be used to access the service. For example, if the domain name is example.com, then the certificate domain name is example.com. Wilcards can be used - for example, *.example.com.

- hostedZoneName: The name of the hosted zone in Route53. This is the domain name that was registered with Route53. For example, if the domain name is example.com, then the hosted zone name is example.com.

- hostedZoneId: The ID of the hosted zone in Route53. This is the ID of the hosted zone that was created when the domain name was registered with Route53. 

- aRecordName: The name of the A record in Route53. This is the name of the A record that will be created. For example, if the domain name is example.com, then the A record name is example.com. 

**The A record must not already exist in Route53.**, otherwise the stack will fail to deploy. It's best to try this first on a subdomain, for example, aws.example.com.

# Deploy
Run the following commands to deploy the stack.
```bash
npm install
npx aws-cdk deploy
```

# Clean up
Run the following command to delete the stack.
```bash
npx aws-cdk destroy
```