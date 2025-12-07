# Register required resource providers
resource "azurerm_resource_provider_registration" "app" {
  name = "Microsoft.App"
}

resource "azurerm_resource_provider_registration" "operationalinsights" {
  name = "Microsoft.OperationalInsights"
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
    azurerm_resource_provider_registration.app,
    azurerm_resource_provider_registration.operationalinsights
  ]
}

# Log Analytics Workspace (required for Container Apps)
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

  depends_on = [
    azurerm_resource_provider_registration.operationalinsights
  ]
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
