import { Component } from "react";

// Shows the error on screen instead of a blank page.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="narrow">
        <h1>Something went wrong</h1>
        <p className="fail">{String(this.state.error.message || this.state.error)}</p>
        <p className="muted">Refresh the page. If it keeps happening, share this message.</p>
      </div>
    );
  }
}
