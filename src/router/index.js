import Vue from 'vue'
import Router from 'vue-router'
import Employees from '@/components/employee/Employees'
import EmployeeAdd from '@/components/employee/EmployeeAdd'
import EmployeeEdit from '@/components/employee/EmployeeEdit'
import EmployeeDetail from '@/components/employee/EmployeeDetail'

import Regions from '@/components/location/region/Regions'
import RegionEdit from '@/components/location/region/RegionEdit'
import RegionAdd from '@/components/location/region/RegionAdd'

import Cities from '@/components/location/city/Cities'
import CityEdit from '@/components/location/city/CityEdit'
import CityAdd from '@/components/location/city/CityAdd'

import Positionsfrs from '@/components/position/positionfrs/Positionsfrs'
import PositionfrsEdit from '@/components/position/positionfrs/PositionfrsEdit'
import PositionfrsAdd from '@/components/position/positionfrs/PositionfrsAdd'

import Positions from '@/components/position/position/Positions'
import PositionEdit from '@/components/position/position/PositionEdit'
import PositionAdd from '@/components/position/position/PositionAdd'

import Tarifnames from '@/components/tarif/tarifname/Tarifnames'
import TarifnameEdit from '@/components/tarif/tarifname/TarifnameEdit'
import TarifnameAdd from '@/components/tarif/tarifname/TarifnameAdd'

import Tarifs from '@/components/tarif/tarif/Tarifs'
import TarifEdit from '@/components/tarif/tarif/TarifEdit'
import TarifUpload from '@/components/tarif/tarif/TarifUpload'

import Tasks from '@/components/task/Tasks'
import TaskEdit from '@/components/task/TaskEdit'

import About from '@/components/About'

import Alert from '@/components/Alert';

Vue.use(Router)

export default new Router({
  routes: [
    /**
     * EMPLOYEE
     */
    {
      path: '/',
      name: 'Employees',
      component: Employees
    },
    {
      path: '/EmployeeAdd',
      name: 'EmployeeAdd',
      component: EmployeeAdd
    },
    {
      path: '/EmployeeEdit/:id',
      name: 'EmployeeEdit',
      component: EmployeeEdit
    },
    {
      path: '/EmployeeDetail/:id',
      name: 'EmployeeDetail',
      component: EmployeeDetail
    },
    /**
     * REGION
     */
    {
      path: '/Regions',
      name: 'Regions',
      component: Regions
    },
    {
      path: '/RegionAdd',
      name: 'RegionAdd',
      component: RegionAdd
    },
    {
      path: '/RegionEdit/:id',
      name: 'RegionEdit',
      component: RegionEdit
    },
    /**
     * CITY
     */
    {
      path: '/Cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/CityAdd',
      name: 'CityAdd',
      component: CityAdd
    },
    {
      path: '/CityEdit/:id',
      name: 'CityEdit',
      component: CityEdit
    },
    /**
     * POSITION FRS
     */
    {
      path: '/Positionsfrs',
      name: 'Positionsfrs',
      component: Positionsfrs
    },
    {
      path: '/PositionfrsAdd',
      name: 'PositionfrsAdd',
      component: PositionfrsAdd
    },
    {
      path: '/PositionfrsEdit/:id',
      name: 'PositionfrsEdit',
      component: PositionfrsEdit
    },
    /**
     * POSITION
     */
    {
      path: '/Positions',
      name: 'Positions',
      component: Positions
    },
    {
      path: '/PositionAdd',
      name: 'PositionAdd',
      component: PositionAdd
    },
    {
      path: '/PositionEdit/:id',
      name: 'PositionEdit',
      component: PositionEdit
    },
    /**
     * TARIFNAME
     */
    {
      path: '/Tarifnames',
      name: 'Tarifnames',
      component: Tarifnames
    },
    {
      path: '/TarifnameAdd',
      name: 'TarifnameAdd',
      component: TarifnameAdd
    },
    {
      path: '/TarifnameEdit/:id',
      name: 'TarifnameEdit',
      component: TarifnameEdit
    },
    /**
     * TARIF
     */
    {
      path: '/Tarifs',
      name: 'Tarifs',
      component: Tarifs
    },
    // {
    //   path: '/TarifnameAdd',
    //   name: 'TarifnameAdd',
    //   component: TarifnameAdd
    // },
    {
      path: '/TarifEdit/:id',
      name: 'TarifEdit',
      component: TarifEdit
    },
    {
      path: '/TarifUpload',
      name: 'TarifUpload',
      component: TarifUpload
    },

    /**
     * ABOUT
     */
    {
      path: '/About',
      name: 'About',
      component: About
    },

    /**
     * Tasks
     */
    {
      path: '/Tasks',
      component: Tasks
    },
    {
      path: '/TaskEdit/:id',
      component: TaskEdit
    }
  ]
})
