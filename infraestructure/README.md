# Terraform Infrastructure

Simple Terraform configuration to create Azure infrastructure (Resource Group) for the Contactos application.

## Prerequisites

1. Azure CLI installed and logged in:
   ```bash
   az login
   ```

2. Terraform installed (>= 1.0)

## Setup

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Review the plan:
   ```bash
   terraform plan
   ```

3. Apply the infrastructure:
   ```bash
   terraform apply
   ```

## Variables

All variables have defaults and are optional. You can override them using:
- `terraform.tfvars` file (recommended)
- Command line: `terraform apply -var="resource_group_name=my-rg"`

## Outputs

After deployment, you'll get:
- Resource group name
- Resource group location

## Destroy

To remove all resources:
```bash
terraform destroy
```

