import {LorePath} from "../RootPath";
import {Organization} from "../../models/lore/Organization";
import {apiRequest, apiRequestList} from "../ApiRequest";

export default class OrganizationService {
    static async createOrganization(name: string): Promise<Organization> {
        return apiRequest(LorePath.Organization + `${name}`, "POST");
    }

    static async getOrganization(id: string): Promise<Organization> {
        return apiRequest(LorePath.Organization + `${id}`);
    }

    static async getOrganizations(): Promise<Organization[]> {
        return apiRequestList(LorePath.Organization);
    }

    static async updateOrganization(organization: Organization): Promise<Organization> {
        return apiRequest(LorePath.Organization + `${organization.id}`, "PUT", organization);
    }
}