import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("An error caught by error boundary", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect){
        return <Redirect to="/"></Redirect>
    }

    if (this.state.hasError) {
      return (
        <h1>
          An unexpected error occurred. <Link to="/">Click Here</Link> to go
          back to the homepage
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
