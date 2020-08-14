import React from 'react';
import Logo from 'assets/images/header_logo.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from 'styles/jss/containers/login';

export class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checklogin: '',
    };
  }
  componentWillMount() {
    this.props.onCheckLoggedInUser();
  }
  handleEnter = e => {
    if (e.key === 'Enter') {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      if (username === '') {
        this.setState({
          username: 'Please input Username',
          password: '',
          checklogin: '',
        });
      } else if (password === '') {
        this.setState({
          password: 'Please input Password',
          username: '',
          checklogin: '',
        });
      } else {
        this.props.onGetLogin(username, password);
      }
    }
  };
  handleLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === '') {
      this.setState({
        username: 'Please input Username',
        password: '',
        checklogin: '',
      });
    } else if (password === '') {
      this.setState({
        password: 'Please input Password',
        username: '',
        checklogin: '',
      });
    } else {
      this.props.onGetLogin(username, password);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card>
          <div className={classes.login_page}>
            <div className={classes.block_login_page}>
              <div className={classes.logo}>
                <img alt="logo" src={Logo} />
              </div>
              <CardContent className={classes.container}>
                <form name="login">
                  <FormControl className={classes.margin}>
                    <InputLabel
                      className={classes.txtText}
                      FormLabelClasses={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                      htmlFor="custom-css-input"
                    >
                      Username
                    </InputLabel>
                    <Input
                      inputProps={{
                        classes: { input: classes.input },
                      }}
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                      onKeyPress={this.handleEnter}
                      id="username"
                    />
                  </FormControl>
                  <p className={classes.validation}>{this.state.username}</p>
                  <FormControl className={classes.margin}>
                    <InputLabel
                      className={classes.txtText}
                      FormLabelClasses={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                      htmlFor="custom-css-input"
                    >
                      Password
                    </InputLabel>
                    <Input
                      type="password"
                      inputProps={{
                        classes: { input: classes.input },
                      }}
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                      onKeyPress={this.handleEnter}
                      id="password"
                    />
                  </FormControl>
                  <p className={classes.validation}>{this.state.password}</p>
                </form>
                <Button
                  onClick={() => this.handleLogin()}
                  type="submit"
                  className={classes.button}
                >
                  Sign in
                </Button>
                <p className={classes.validation}>{this.state.checklogin}</p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.any,
  onGetLogin: PropTypes.func.isRequired,
  onCheckLoggedInUser: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
