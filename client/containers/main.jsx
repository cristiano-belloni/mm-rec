import React from 'react'
import CompanyCard from '../components/company-card'
import CompanySelector from '../components/company-selector'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import style from './main.local.scss'

const Main = () => (
  <div className={style.main}>
    <Toolbar>
      <ToolbarGroup>
        <CompanySelector />
      </ToolbarGroup>
    </Toolbar>
    <CompanyCard />
  </div>
)

export default Main
