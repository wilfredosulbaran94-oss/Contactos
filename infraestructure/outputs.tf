output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "resource_group_location" {
  description = "Location of the resource group"
  value       = azurerm_resource_group.main.location
}

output "container_app_environment_name" {
  description = "Name of the Container Apps Environment"
  value       = azurerm_container_app_environment.main.name
}

output "container_app_environment_id" {
  description = "ID of the Container Apps Environment"
  value       = azurerm_container_app_environment.main.id
}

output "log_analytics_workspace_id" {
  description = "ID of the Log Analytics Workspace"
  value       = azurerm_log_analytics_workspace.main.id
}

