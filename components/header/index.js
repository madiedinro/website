import * as React from 'react';
import {Link} from '../../next-routes';

import cl from 'classnames';
import PropTypes from 'prop-types';

import style from './style.scss';
import { LogoIcon } from '../../static/icons';
import { headerMenu, langsMenu, linksMenu } from '../../constants';

import { createLinker } from '../../utils/url-maker'
import { itemTarget } from '../../utils/menu'



export class Header extends React.Component {
  static propTypes = {
    headerBgActive: PropTypes.bool,
    linkMenuPosition: PropTypes.string,
    lang: PropTypes.string,
    documentation: PropTypes.bool,
    activePath: PropTypes.string
  }

  state = {
    menuActive: false
  }

  changeMenu = () => {
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  render() {
    const { headerBgActive, linkMenuPosition, lang, documentation, activeSection } = this.props;
    const { menuActive } = this.state;
    const linkTo = createLinker(lang);

    return (
      <header
        className={cl(
          style.rockstatHeader,
          { [style.activeBg]: headerBgActive || linkMenuPosition === 'top' },
          { [style.documentation]: documentation },
          { [style.menuActive]: menuActive }
        )}>
        <div onClick={this.changeMenu} className={cl(style.gamburger, { [style.active]: menuActive })}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={style.logo}>
          <Link route={linkTo()}>
            <a><LogoIcon /></a>
          </Link>
        </div>

        <div className={style.menu}>
          {
            linksMenu.map((item, index) => {
              return (
                <div key={index} className={cl(style.menuItem, style.linksMenu)} >
                  <Link route={linkTo(item.path)}>
                    <a target={itemTarget(item)} className={cl({ [style.active]: activeSection === item.name })}> {item.name} </a>
                  </Link>
                </div>
              )
            })
          }
          {
            headerMenu.map((item, index) => {
              return (
                <div key={index} className={style.menuItem} >
                  <Link route={linkTo(item.path)}>
                    <a target={itemTarget(item)} className={cl({ [style.active]: activeSection === item.name })}> {item.title} </a>
                  </Link>
                </div>
              )
            })
          }
          <div className={style.menuItemLg}>
            {
              langsMenu.map((item, index) => {
                return (
                  <div key={index} className={style.menuItemLgItem} >
                    <Link route="main" params={{lang: item.key}} >
                      <a target={itemTarget(item)} className={cl({ [style.active]: lang === item.name })}> {item.name} </a>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </header>
    )
  }
}
