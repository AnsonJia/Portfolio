import CodeLine from '../../components/CodeLine/CodeLine';
import ActionButton from '../../components/ActionButton/ActionButton';

export default function NotFound() {
  return (
    <section className="page">
      <div className="container">
        <div className="row mt-8">
          <div className="col-auto">

            <CodeLine number="404" className="mt-5 mt-lg-7 mb-5">
              <span className="code--red">error:</span>
              <span className="code--yellow">&nbsp;page not found</span>
            </CodeLine>

            <h1 className="mb-5 lead">OOPS...</h1>

            <p className="text-light mb-6">
              Looks you've navigated to a broken link.
              <br />
              <em>Try not doing that again in the future.</em>
            </p>

            <ActionButton to="/">
              <i className="fa-solid fa-chevron-left" />
              Back
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}