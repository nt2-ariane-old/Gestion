import React from "react";
import { Link } from "react-router-dom";
const Breadcrumbs = ({ crumbs }) => {
    // Don't render a single breadcrumb.
    if (crumbs === null) return null;
    if (crumbs.length <= 1) return null;

    return (
        <div className="breadcrumb">
            {/* Link back to any previous steps of the breadcrumb. */}
            {crumbs.map(({ name, path }, key) =>
                key + 1 === crumbs.length ? (
                    <div key={'crumbs_' + key}>{name}</div>
                ) : (
                        <div key={'crumbs_' + key}><Link  to={path}>{name}</Link><span>/</span></div>

                    )
            )}
        </div>
    );
};
export default Breadcrumbs;