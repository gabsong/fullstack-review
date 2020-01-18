import React from 'react';

const Repo = (props) => (
  <div>
    <div className="repo-name">
      <a href={props.repo.repo_url}>{props.repo.repo_name}</a>
    </div>
  </div>
)

export default Repo;