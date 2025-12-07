variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
  default     = "edf5bac7-aa05-4b29-9f51-2d8c0a386a3f"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-contactos"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "eastus"
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "contactos"
}

