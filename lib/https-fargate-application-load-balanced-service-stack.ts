import * as cdk from "aws-cdk-lib";
import { StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  Cluster,
  ContainerImage,
} from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { ApplicationProtocol } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { HostedZone, ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { LoadBalancerTarget } from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

export interface AppStackProps extends StackProps {
  certificateDomainName: string;
  hostedZoneName: string;
  hostedZoneId: string;
  aRecordName: string;
}

export class HttpsFargateApplicationLoadBalancedServiceStack extends cdk.Stack {
  public readonly APP_PORT: number = 80;
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const cluster = new Cluster(this, "HttpsFargateAlbCluster", {});

    const publicZone = HostedZone.fromHostedZoneAttributes(
      this,
      "HttpsFargateAlbPublicZone",
      {
        zoneName: props.hostedZoneName,
        hostedZoneId: props.hostedZoneId,
      }
    );

    const certificate = new Certificate(this, "HttpsFargateAlbCertificate", {
      domainName: props?.certificateDomainName,
      validation: CertificateValidation.fromDns(publicZone),
    });

    const appService = new ApplicationLoadBalancedFargateService(
      this,
      "HttpsFargateAlbService",
      {
        taskImageOptions: {
          image: ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
          containerPort: this.APP_PORT,
        },
        cluster,
        protocol: ApplicationProtocol.HTTPS,
        certificate,
        redirectHTTP: true,
      }
    );

    new ARecord(this, "HttpsFargateAlbARecord", {
      zone: publicZone,
      recordName: props.aRecordName,
      target: RecordTarget.fromAlias(
        new LoadBalancerTarget(appService.loadBalancer)
      ),
    });
  }
}



