# Register required resource provider (Microsoft.OperationalInsights is auto-registered by Terraform)
resource "azurerm_resource_provider_registration" "app" {
  name = "Microsoft.App"
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    environment = "production"
    app         = var.app_name
  }

  depends_on = [
    azurerm_resource_provider_registration.app
  ]
}

# Log Analytics Workspace (required for Container Apps)
# Microsoft.OperationalInsights is automatically registered by Terraform
resource "azurerm_log_analytics_workspace" "main" {
  name                = "${var.app_name}-logs"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = {
    environment = "production"
    app         = var.app_name
  }
}

# Container Apps Environment
resource "azurerm_container_app_environment" "main" {
  name                       = "${var.app_name}-env"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id

  tags = {
    environment = "production"
    app         = var.app_name
  }

  depends_on = [
    azurerm_resource_provider_registration.app
  ]
}
