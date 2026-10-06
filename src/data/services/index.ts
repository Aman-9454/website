import { serviceCatalog, type ServiceSlug } from "@/data/service-catalog";
import type { ServiceDetail } from "@/lib/validators";
import aiSoftwareDevelopment from "@/data/service-pages/ai-software-development";
import aiWorkflowAutomation from "@/data/service-pages/ai-workflow-automation";
import customSoftwareDevelopment from "@/data/service-pages/custom-software-development";
import productEngineering from "@/data/service-pages/product-engineering";
import webMobileApplications from "@/data/service-pages/web-mobile-applications";
import cloudDevops from "@/data/service-pages/cloud-devops";
import dataIntegrations from "@/data/service-pages/data-integrations";
import hrOperationsSystems from "@/data/service-pages/hr-operations-systems";
import seoOptimization from "@/data/service-pages/seo-optimization";

const bySlug: Record<ServiceSlug, ServiceDetail> = {
  "ai-software-development": aiSoftwareDevelopment,
  "ai-workflow-automation": aiWorkflowAutomation,
  "custom-software-development": customSoftwareDevelopment,
  "product-engineering": productEngineering,
  "web-mobile-applications": webMobileApplications,
  "cloud-devops": cloudDevops,
  "data-integrations": dataIntegrations,
  "hr-operations-systems": hrOperationsSystems,
  "seo-optimization": seoOptimization,
};

for (const service of Object.values(bySlug)) {
  for (const related of service.related) {
    if (!(related in bySlug) || related === service.slug) {
      throw new Error(`Service "${service.slug}" has an invalid related slug "${related}"`);
    }
  }
}

const services: ServiceDetail[] = serviceCatalog.map(({ slug }) => bySlug[slug]);

export function getService(slug: string): ServiceDetail | undefined {
  return bySlug[slug as ServiceSlug];
}

export default services;
