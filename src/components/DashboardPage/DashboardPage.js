import React from 'react'
import HeaderTitle from '../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import envConfigs from '../../config/apiConfig'
import '../../styles/dashboard.css'

class DashboardPage extends React.Component {
  render () {
    return (
      <div className="dp-body">
        <HeaderTitle title="Application Dashboards" />
        <Helmet title="Dashboard" />
        <div className="dp-title">Redash - Business Metrics</div>
        <div className="dp-links-group">
          <div><a href={envConfigs.redashDashboards.vaultMetrics} target="_blank">Vault Metrics</a></div>
          <div><a href={envConfigs.redashDashboards.imageMetrics} target="_blank">Image Metrics</a></div>
          <div><a href={envConfigs.redashDashboards.textMetrics} target="_blank">Text Metrics</a></div>
        </div>
        <div className="dp-title">Grafana - System Metrics</div>
        <div className="dp-links-group">
          <div><a href={envConfigs.grafanaDashboards.k8sCepTtc} target="_blank">K8 CEP TTC Customer Dashboard</a></div>
          <div><a href={envConfigs.grafanaDashboards.k8sCepTte} target="_blank">K8 CEP TTE Customer Dashboard</a></div>
          <div><a href={envConfigs.grafanaDashboards.k8sDcvTtc} target="_blank">K8 DCV TTC Customer Dashboard</a></div>
          <div><a href={envConfigs.grafanaDashboards.k8sDcvTte} target="_blank">K8 DCV TTE Customer Dashboard</a></div>
          <div><a href={envConfigs.grafanaDashboards.k8sCepAppEx} target="_blank">K8 CEP Application Dashboard Example</a></div>
        </div>
        <div className="dp-title">Kibana - Application Logs</div>
        <div className="dp-links-group">
          <div><a href={envConfigs.kibanaDashboards.ttcErrors} target="_blank">Pipeline K8 Application Errors - TTC</a></div>
          <div><a href={envConfigs.kibanaDashboards.tteErrors} target="_blank">Pipeline K8 Application Errors - TTE</a></div>
          <div><a href={envConfigs.kibanaDashboards.ostTtcErrors} target="_blank">Vault OST Application Errors - TTC</a></div>
          <div><a href={envConfigs.kibanaDashboards.ostTteErrors} target="_blank">Vault OST Application Errors - TTE</a></div>
          <div><a href={envConfigs.kibanaDashboards.cepOstTtcErrors} target="_blank">Pipeline OST Application Errors - TTC</a></div>
          <div><a href={envConfigs.kibanaDashboards.cepOstTteErrors} target="_blank">Pipeline OST Application Errors - TTE</a></div>
          <div><a href={envConfigs.kibanaDashboards.logging} target="_blank">K8 Search Application Logs</a></div>
          <div><a href={envConfigs.kibanaDashboards.ostttcLogs} target="_blank">OST Search Application Logs - TTC</a></div>
          <div><a href={envConfigs.kibanaDashboards.osttteLogs} target="_blank">OST Search Application Logs - TTE</a></div>
        </div>
        <div className="dp-title">Mongo - System Metrics</div>
        <div className="dp-links-group">
          <div><a href={envConfigs.mongoDashboards.stgcontentdb} target="_blank">Stage ContentDB</a></div>
          <div><a href={envConfigs.mongoDashboards.prdcontentdb} target="_blank">Prod ContentDB</a></div>
          <div><a href={envConfigs.mongoDashboards.stgvaultdb} target="_blank">Stage VaultDB</a></div>
          <div><a href={envConfigs.mongoDashboards.prdvaultdb} target="_blank">Prod VaultDB</a></div>
        </div>
      </div>
    )
  }
}

export default DashboardPage
