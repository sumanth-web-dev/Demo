import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <Container>
        <SectionHeading
          label="Selected Work"
          title="Examples of what we build."
          description="Selected projects showcasing our approach to solving real business challenges with AI and software."
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
