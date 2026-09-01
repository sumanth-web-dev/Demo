import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <Container>
        <SectionHeading
          label="Selected Capabilities"
          title="Examples of what we can create."
          description="Selected projects showcasing our approach and technical capabilities."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
